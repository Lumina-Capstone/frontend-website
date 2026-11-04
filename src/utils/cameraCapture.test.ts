import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  CAMERA_TARGET_HEIGHT,
  CAMERA_TARGET_WIDTH,
  MIN_USEFUL_CAPTURE_SIDE,
  cameraVideoConstraints,
  captureReceiptPhoto,
  tuneCameraTrack,
} from './cameraCapture';

function makeVideo(videoWidth: number, videoHeight: number) {
  return { videoWidth, videoHeight } as unknown as HTMLVideoElement;
}

function makeStream() {
  const track = {} as MediaStreamTrack;
  return { getVideoTracks: () => [track] } as unknown as MediaStream;
}

function makeCanvas(blob: Blob | null) {
  const drawImage = vi.fn();
  const toBlob = vi.fn((cb: (b: Blob | null) => void) => cb(blob));
  const canvas = {
    width: 0,
    height: 0,
    getContext: () => ({ drawImage }),
    toBlob,
  } as unknown as HTMLCanvasElement & { toBlob: ReturnType<typeof vi.fn> };
  return { canvas, drawImage, toBlob };
}

describe('cameraVideoConstraints', () => {
  it('requests the rear camera at a high ideal resolution', () => {
    const c = cameraVideoConstraints();
    expect(c.facingMode).toBe('environment');
    expect((c.width as { ideal: number }).ideal).toBe(CAMERA_TARGET_WIDTH);
    expect((c.height as { ideal: number }).ideal).toBe(CAMERA_TARGET_HEIGHT);
  });
});

describe('tuneCameraTrack', () => {
  it('applies resolution then continuous autofocus when the device supports it', async () => {
    const applyConstraints = vi.fn().mockResolvedValue(undefined);
    const track = {
      applyConstraints,
      getCapabilities: () => ({ focusMode: ['manual', 'continuous', 'auto'] }),
    } as unknown as MediaStreamTrack;

    await tuneCameraTrack(track);

    expect(applyConstraints).toHaveBeenCalledTimes(2);
    expect(applyConstraints.mock.calls[0][0]).toEqual({
      width: { ideal: CAMERA_TARGET_WIDTH },
      height: { ideal: CAMERA_TARGET_HEIGHT },
    });
    expect(applyConstraints.mock.calls[1][0]).toEqual({
      advanced: [{ focusMode: 'continuous' }],
    });
  });

  it('skips autofocus when the capability list lacks continuous', async () => {
    const applyConstraints = vi.fn().mockResolvedValue(undefined);
    const track = {
      applyConstraints,
      getCapabilities: () => ({ focusMode: ['manual'] }),
    } as unknown as MediaStreamTrack;

    await tuneCameraTrack(track);

    expect(applyConstraints).toHaveBeenCalledTimes(1);
  });

  it('survives browsers that expose no getCapabilities and rejected constraints', async () => {
    const track = {
      applyConstraints: vi.fn().mockRejectedValue(new Error('unsupported')),
    } as unknown as MediaStreamTrack;

    await expect(tuneCameraTrack(track)).resolves.toBeUndefined();
  });
});

describe('captureReceiptPhoto', () => {
  const originalImageCapture = (globalThis as { ImageCapture?: unknown }).ImageCapture;
  const originalCreateImageBitmap = globalThis.createImageBitmap;

  afterEach(() => {
    if (originalImageCapture === undefined) {
      delete (globalThis as { ImageCapture?: unknown }).ImageCapture;
    } else {
      (globalThis as { ImageCapture?: unknown }).ImageCapture = originalImageCapture;
    }
    globalThis.createImageBitmap = originalCreateImageBitmap;
    vi.restoreAllMocks();
  });

  it('uses ImageCapture.takePhoto at maximum quality when available', async () => {
    globalThis.createImageBitmap = undefined as unknown as typeof createImageBitmap;
    const takePhoto = vi.fn().mockResolvedValue(new Blob(['full-res'], { type: 'image/jpeg' }));
    (globalThis as { ImageCapture?: unknown }).ImageCapture = class {
      constructor() {}
      takePhoto = takePhoto;
    };

    const { canvas, toBlob } = makeCanvas(null);
    const result = await captureReceiptPhoto(makeVideo(4000, 3000), canvas, makeStream());

    expect(takePhoto).toHaveBeenCalledWith({ photoQuality: 'maximum' });
    expect(toBlob).not.toHaveBeenCalled();
    expect(result?.file.name).toBe('camera-capture.jpg');
    expect(result?.file.type).toBe('image/jpeg');
    expect(result?.lowRes).toBe(false);
  });

  it('falls back to a frame grab when takePhoto fails', async () => {
    (globalThis as { ImageCapture?: unknown }).ImageCapture = class {
      constructor() {}
      takePhoto = vi.fn().mockRejectedValue(new Error('not allowed'));
    };

    const { canvas, drawImage, toBlob } = makeCanvas(new Blob(['frame'], { type: 'image/jpeg' }));
    const result = await captureReceiptPhoto(makeVideo(1280, 720), canvas, makeStream());

    expect(toBlob).toHaveBeenCalled();
    expect(drawImage).toHaveBeenCalled();
    expect(result?.lowRes).toBe(false);
  });

  it('flags low-resolution captures from the fallback frame path', async () => {
    delete (globalThis as { ImageCapture?: unknown }).ImageCapture;

    const { canvas } = makeCanvas(new Blob(['frame'], { type: 'image/jpeg' }));
    const result = await captureReceiptPhoto(makeVideo(640, 480), canvas, makeStream());

    expect(MIN_USEFUL_CAPTURE_SIDE).toBe(1000);
    expect(result?.lowRes).toBe(true);
  });

  it('returns null when neither path yields a blob', async () => {
    delete (globalThis as { ImageCapture?: unknown }).ImageCapture;

    const { canvas } = makeCanvas(null);
    const result = await captureReceiptPhoto(makeVideo(1280, 720), canvas, makeStream());

    expect(result).toBeNull();
  });
});

import { prepareReceiptImage } from './imageResize';

export const CAMERA_TARGET_WIDTH = 1920;
export const CAMERA_TARGET_HEIGHT = 1080;
export const MIN_USEFUL_CAPTURE_SIDE = 1000;

export function cameraVideoConstraints(): MediaTrackConstraints {
  return {
    facingMode: 'environment',
    width: { ideal: CAMERA_TARGET_WIDTH },
    height: { ideal: CAMERA_TARGET_HEIGHT },
  };
}

export async function tuneCameraTrack(track: MediaStreamTrack): Promise<void> {
  const ideal = cameraVideoConstraints();
  try {
    await track.applyConstraints({ width: ideal.width, height: ideal.height });
  } catch {
    // Browser already picked the best it can.
  }

  try {
    const capabilities = track.getCapabilities?.() as MediaTrackCapabilities & {
      focusMode?: string[];
    };
    if (capabilities?.focusMode?.includes('continuous')) {
      const focusConstraint: MediaTrackConstraintSet & { focusMode?: string } = {
        focusMode: 'continuous',
      };
      await track.applyConstraints({ advanced: [focusConstraint] });
    }
  } catch {
    // Autofocus is a nicety; never break the preview over it.
  }
}

function grabVideoFrame(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
): Promise<Blob | null> {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext('2d');
  if (!context) return Promise.resolve(null);

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob),
      'image/jpeg',
      0.92,
    );
  });
}

type TakePhotoOptions = PhotoSettings & { photoQuality?: 'minimum' | 'maximum' };

export type ReceiptCapture = {
  file: File;
  lowRes: boolean;
};

export async function captureReceiptPhoto(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  stream: MediaStream,
): Promise<ReceiptCapture | null> {
  const track = stream.getVideoTracks()[0];

  if (track && typeof ImageCapture !== 'undefined') {
    try {
      const options: TakePhotoOptions = { photoQuality: 'maximum' };
      const blob = await new ImageCapture(track).takePhoto(options);
      const raw = new File([blob], 'camera-capture.jpg', {
        type: blob.type || 'image/jpeg',
        lastModified: Date.now(),
      });
      const file = await prepareReceiptImage(raw, { force: true });
      return { file, lowRes: false };
    } catch {
      // Fall through to frame-grab below.
    }
  }

  const frame = await grabVideoFrame(video, canvas);
  if (!frame) return null;

  const file = new File([frame], 'camera-capture.jpg', {
    type: 'image/jpeg',
    lastModified: Date.now(),
  });
  const longest = Math.max(video.videoWidth, video.videoHeight);
  return { file, lowRes: longest > 0 && longest < MIN_USEFUL_CAPTURE_SIDE };
}

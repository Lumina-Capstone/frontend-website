import { afterEach, describe, expect, it } from 'vitest';
import {
  MAX_UPLOAD_DIMENSION,
  RECOMPRESS_THRESHOLD_BYTES,
  computeScaledDimensions,
  needsResize,
  prepareReceiptImage,
} from './imageResize';

describe('computeScaledDimensions', () => {
  it('scales landscape photos by their long edge', () => {
    expect(computeScaledDimensions(4000, 3000, 1600)).toEqual({ width: 1600, height: 1200 });
  });

  it('scales portrait photos by their long edge', () => {
    expect(computeScaledDimensions(3000, 4000, 1600)).toEqual({ width: 1200, height: 1600 });
  });

  it('never upscales small images', () => {
    expect(computeScaledDimensions(800, 600, 1600)).toEqual({ width: 800, height: 600 });
  });

  it('keeps already-exact images unchanged', () => {
    expect(computeScaledDimensions(1600, 1600, 1600)).toEqual({ width: 1600, height: 1600 });
  });

  it('rounds extreme aspect ratios to at least one pixel', () => {
    expect(computeScaledDimensions(5000, 100, 1600)).toEqual({ width: 1600, height: 32 });
  });

  it('returns null for invalid dimensions', () => {
    expect(computeScaledDimensions(0, 3000, 1600)).toBeNull();
  });
});

describe('needsResize', () => {
  it('is true when either dimension exceeds the cap', () => {
    expect(needsResize(2000, 1000, 200_000)).toBe(true);
  });

  it('is true when the file is heavy even if dimensions fit', () => {
    expect(needsResize(1200, 900, RECOMPRESS_THRESHOLD_BYTES + 1)).toBe(true);
  });

  it('is false for already-small, light images', () => {
    expect(needsResize(1200, 900, 300_000)).toBe(false);
  });

  it('exposes the 1600px long-edge cap', () => {
    expect(MAX_UPLOAD_DIMENSION).toBe(1600);
  });
});

describe('prepareReceiptImage', () => {
  const originalCreateImageBitmap = globalThis.createImageBitmap;

  afterEach(() => {
    globalThis.createImageBitmap = originalCreateImageBitmap;
  });

  it('returns the original file when the browser cannot decode it', async () => {
    globalThis.createImageBitmap = () => Promise.reject(new Error('decode failed'));
    const file = new File([new Uint8Array(10)], 'receipt.png', { type: 'image/png' });

    await expect(prepareReceiptImage(file)).resolves.toBe(file);
  });

  it('returns the original file when decoding is unavailable', async () => {
    globalThis.createImageBitmap = undefined as unknown as typeof createImageBitmap;
    const file = new File([new Uint8Array(10)], 'receipt.jpg', { type: 'image/jpeg' });

    await expect(prepareReceiptImage(file)).resolves.toBe(file);
  });

  it('still returns the original under force when decoding is unavailable', async () => {
    globalThis.createImageBitmap = undefined as unknown as typeof createImageBitmap;
    const file = new File([new Uint8Array(10)], 'receipt.jpg', { type: 'image/jpeg' });

    await expect(prepareReceiptImage(file, { force: true })).resolves.toBe(file);
  });
});

describe('prepareReceiptImage force mode', () => {
  const originalCreateImageBitmap = globalThis.createImageBitmap;
  const originalCreateElement = document.createElement.bind(document);

  afterEach(() => {
    globalThis.createImageBitmap = originalCreateImageBitmap;
    document.createElement = originalCreateElement;
  });

  it('re-encodes an already-small file when forced', async () => {
    globalThis.createImageBitmap = (() =>
      Promise.resolve({ width: 1200, height: 900, close: () => {} })) as typeof createImageBitmap;

    const fakeCanvas = {
      width: 0,
      height: 0,
      getContext: () => ({ drawImage: () => {} }),
      toBlob: (cb: (b: Blob) => void) =>
        cb(new Blob(['x'.repeat(5000)], { type: 'image/jpeg' })),
    };
    document.createElement = ((tagName: string) =>
      tagName === 'canvas'
        ? (fakeCanvas as unknown as HTMLElement)
        : originalCreateElement(tagName)) as typeof document.createElement;

    const file = new File([new Uint8Array(10)], 'nota.png', { type: 'image/png' });

    const withoutForce = await prepareReceiptImage(file);
    expect(withoutForce).toBe(file);

    const withForce = await prepareReceiptImage(file, { force: true });
    expect(withForce).not.toBe(file);
    expect(withForce.name).toBe('nota.jpg');
    expect(withForce.type).toBe('image/jpeg');
  });
});

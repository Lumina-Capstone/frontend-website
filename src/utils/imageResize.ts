export const MAX_UPLOAD_DIMENSION = 1600;
export const UPLOAD_JPEG_QUALITY = 0.85;
export const RECOMPRESS_THRESHOLD_BYTES = 1_500_000;

export function computeScaledDimensions(
  width: number,
  height: number,
  maxSide: number,
): { width: number; height: number } | null {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return null;
  }

  const longest = Math.max(width, height);
  if (longest <= maxSide) {
    return { width: Math.round(width), height: Math.round(height) };
  }

  const scale = maxSide / longest;
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

export function needsResize(
  width: number,
  height: number,
  sizeInBytes: number,
  maxSide: number = MAX_UPLOAD_DIMENSION,
  maxBytes: number = RECOMPRESS_THRESHOLD_BYTES,
): boolean {
  return Math.max(width, height) > maxSide || sizeInBytes > maxBytes;
}

function encodeJpeg(bitmap: ImageBitmap, width: number, height: number): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) return Promise.resolve(null);

  context.drawImage(bitmap, 0, 0, width, height);

  return new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', UPLOAD_JPEG_QUALITY);
  });
}

export async function prepareReceiptImage(file: File): Promise<File> {
  try {
    if (typeof globalThis.createImageBitmap !== 'function') return file;

    const bitmap = await globalThis.createImageBitmap(file, { imageOrientation: 'from-image' });
    try {
      if (!needsResize(bitmap.width, bitmap.height, file.size)) return file;

      const target = computeScaledDimensions(bitmap.width, bitmap.height, MAX_UPLOAD_DIMENSION);
      if (!target) return file;

      const blob = await encodeJpeg(bitmap, target.width, target.height);
      if (!blob || blob.size >= file.size) return file;

      const baseName = file.name.replace(/\.[^./\\]+$/, '') || 'receipt';
      return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg', lastModified: Date.now() });
    } finally {
      bitmap.close();
    }
  } catch {
    return file;
  }
}

export function formatRupiah(
  value: number,
  options?: { decimals?: number }
): string {
  const decimals = options?.decimals ?? 0;
  if (isNaN(value)) {
    return decimals > 0
      ? 'Rp 0.' + '0'.repeat(decimals)
      : 'Rp 0';
  }
  const isNegative = value < 0;
  const magnitude = Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${isNegative ? '-' : ''}Rp ${magnitude}`;
}

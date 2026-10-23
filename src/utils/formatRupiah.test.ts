import { describe, expect, it } from 'vitest';
import { formatRupiah } from './formatRupiah';

describe('formatRupiah', () => {
  it('formats a positive amount with thousand separators', () => {
    expect(formatRupiah(44000)).toBe('Rp 44,000');
  });

  it('prefixes negative amounts with minus', () => {
    expect(formatRupiah(-1500)).toBe('-Rp 1,500');
  });

  it('returns Rp 0 for NaN', () => {
    expect(formatRupiah(NaN)).toBe('Rp 0');
  });

  it('formats with two decimals when requested (ledger style)', () => {
    expect(formatRupiah(44250.5, { decimals: 2 })).toBe('Rp 44,250.50');
    expect(formatRupiah(NaN, { decimals: 2 })).toBe('Rp 0.00');
  });
});

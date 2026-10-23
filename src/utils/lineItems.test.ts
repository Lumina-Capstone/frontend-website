import { describe, expect, it } from 'vitest';
import { recalcTotal, editItem, removeItem, type LineItem } from './lineItems';

const item = (over: Partial<LineItem>): LineItem => ({
  item_name: '', quantity: 1, price: 0, sub_price: 0, ...over,
});

describe('recalcTotal', () => {
  it('sums existing sub_price values', () => {
    expect(recalcTotal([
      item({ sub_price: 100, price: 100 }),
      item({ sub_price: 250, price: 250 }),
    ])).toBe(350);
  });

  it('falls back to quantity x price when sub_price is missing', () => {
    expect(recalcTotal([item({ quantity: 3, price: 500 })])).toBe(1500);
  });

  it('falls back per item, not per whole list', () => {
    expect(recalcTotal([
      item({ sub_price: 0, price: 0 }),
      item({ quantity: 2, price: 100 }),
    ])).toBe(200);
  });

  it('returns 0 for an empty list', () => {
    expect(recalcTotal([])).toBe(0);
  });
});

describe('editItem', () => {
  const items = [
    item({ item_name: 'Egg', quantity: 2, price: 1000, sub_price: 2000 }),
    item({ item_name: 'Feed', quantity: 1, price: 500, sub_price: 500 }),
  ];

  it('updates a field without mutating the original array', () => {
    const { items: next } = editItem(items, 0, 'quantity', 5);
    expect(next[0].quantity).toBe(5);
    expect(items[0].quantity).toBe(2);
    expect(next[1]).toBe(items[1]);
  });

  it('recomputes sub_price from quantity and price', () => {
    const { items: next, amount } = editItem(items, 0, 'price', 2000);
    expect(next[0].sub_price).toBe(4000);
    expect(amount).toBe(4500);
  });

  it('treats quantity 0 as 1, matching existing behavior', () => {
    const { items: next } = editItem(items, 0, 'quantity', 0);
    expect(next[0].sub_price).toBe(1000);
  });
});

describe('removeItem', () => {
  const items = [
    item({ item_name: 'Egg', quantity: 2, price: 1000, sub_price: 2000 }),
    item({ item_name: 'Feed', quantity: 1, price: 500, sub_price: 500 }),
  ];

  it('removes the row and recomputes total', () => {
    const { items: next, amount } = removeItem(items, 0);
    expect(next).toHaveLength(1);
    expect(next[0].item_name).toBe('Feed');
    expect(amount).toBe(500);
  });

  it('does not mutate the original array', () => {
    removeItem(items, 0);
    expect(items).toHaveLength(2);
  });
});

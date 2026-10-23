export type LineItem = {
  item_name: string;
  quantity: number;
  price: number;
  sub_price: number;
};

export function recalcTotal(items: LineItem[]): number {
  return items.reduce((sum, it) => {
    return sum + (Number(it.sub_price) || (Number(it.quantity || 1) * Number(it.price || 0)));
  }, 0);
}

export function editItem(
  items: LineItem[],
  index: number,
  field: keyof LineItem,
  value: number | string
): { items: LineItem[]; amount: number } {
  const next = items.map((item, i) => {
    if (i !== index) return item;
    const updated = { ...item, [field]: value };
    const qty = Number(updated.quantity) || 1;
    const price = Number(updated.price) || 0;
    return { ...updated, sub_price: qty * price };
  });
  return { items: next, amount: recalcTotal(next) };
}

export function removeItem(items: LineItem[], index: number): { items: LineItem[]; amount: number } {
  const next = items.filter((_, i) => i !== index);
  return { items: next, amount: recalcTotal(next) };
}

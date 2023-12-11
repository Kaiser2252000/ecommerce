export interface ILineItem {
  id?: number;
  productId?: number;
  productName?: string | null;
  orderId?: number;
  price?: number | null;
  quantity?: number | null;
  discount?: number | null;
}

export const defaultValue: Readonly<ILineItem> = {};

export interface ICartLineItem {
  id?: number;
  productId?: number;
  productName?: string | null;
  cartId?: number;
  quantity?: number | null;
  price?: number | null;
  imageUrl?:string | null;
  discount?: number | null;
  maxQuantity?: number | null;
}

export const defaultValue: Readonly<ICartLineItem> = {};

import {ICartLineItem} from "app/shared/model/cart-line-item.model";

export interface ICart {
  id?: number;
  userId?: number;
  cartLineItemDTOList?: ICartLineItem[]|null;
}

export const defaultValue: Readonly<ICart> = {};

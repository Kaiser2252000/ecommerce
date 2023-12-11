import dayjs from 'dayjs';
import {ILineItem} from "app/shared/model/line-item.model";

export interface IOrders {
  id?: number;
  userId?: number | null;
  userName?: string | null;
  orderDate?: string | null;
  shipPrice?: number | null;
  status?: string | null;
  shipperName?: string | null;
  shipperPhone?: string | null;
  lineItemDTOList?: ILineItem[] | null;
  customerName?: string|null;
  customerPhone?: string|null;
  customerAddress?: string|null;
}

export const defaultValue: Readonly<IOrders> = {};

import dayjs from 'dayjs';

export interface IBill {
  id?: number;
  orderId?: number;
  userId?: number | null;
  customerId?: number | null;
  totalPrice?: number | null;
  vat?: number | null;
  paymentDate?: string | null;
  status?: string | null;
}

export const defaultValue: Readonly<IBill> = {};

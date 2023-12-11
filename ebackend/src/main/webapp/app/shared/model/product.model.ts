import dayjs from 'dayjs';

export interface IProduct {
  id?: number;
  name?: string;
  price?: number | null;
  quantity?: number | null;
  categoryId?: number | null;
  categoryName?: string | null;
  brand?: string | null;
  imageUrl?: string | null;
  status?: boolean | null;
  discount?: number | null;
  discountStartDate?: string | null;
  discountEndDate?: string | null;
}

export const defaultValue: Readonly<IProduct> = {
  status: false,
};

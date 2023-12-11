export interface ICategory {
  id?: number;
  name?: string;
  parentId?: number | null;
}

export const defaultValue: Readonly<ICategory> = {};

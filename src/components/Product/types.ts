import { IAssets } from 'assets';

export type TProduct = {
  id: string;
  price: number;
  productName: string;
  description?: string;
  icon?: keyof IAssets;
};

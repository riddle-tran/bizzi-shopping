import { TProduct } from 'components/Product/types';

export type TCart = TProduct & {
  quantity: number;
};

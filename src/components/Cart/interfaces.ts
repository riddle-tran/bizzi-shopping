import { TCart } from './types';

export interface CartProps {
  cart: TCart;
  onRemoveCart?: (id: string) => void;
}

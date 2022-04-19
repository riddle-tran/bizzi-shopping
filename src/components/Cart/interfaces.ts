import { ICart } from 'entities/cart';

export interface CartProps {
  cart: ICart;
  onRemoveCart?: (id: string) => void;
}

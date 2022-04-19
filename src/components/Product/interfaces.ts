import { IProduct } from 'entities/product';

export interface ProductProps {
  product: IProduct;
  onAddCart?: (id: string) => void;
}

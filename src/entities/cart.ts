import { IUser } from './user';
import { IProduct } from './product';

export interface ICartBase {
  quantity: number;
  user: IUser['id'];
  product: IProduct;
}

export interface ICart extends ICartBase {
  id: string;
}

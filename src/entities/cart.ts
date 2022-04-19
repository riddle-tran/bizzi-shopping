import { IUser } from './user';
import { IProduct } from './product';

export interface ICartBase {
  quantity: number;
  userId: IUser['id'];
  productId: IProduct['id'];
}

export interface ICart extends ICartBase {
  id: string;
}

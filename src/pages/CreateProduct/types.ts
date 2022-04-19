import { TThumbnail } from 'entities/product';

export type TCreateProductFormData = {
  name: string;
  price: number;

  // Optional
  description?: string;
  thumbnail?: TThumbnail;
};

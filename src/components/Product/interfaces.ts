import { TProduct } from './types'

export interface ProductProps {
	product: TProduct
  onAddCart?: (id: string) => void
}

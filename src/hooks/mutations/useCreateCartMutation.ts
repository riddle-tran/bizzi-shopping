import { ICart } from 'entities/cart';
import { gql, useMutation, MutationHookOptions } from '@apollo/client';

export interface TCreateCartRequestParams {
  quantity: number;
  productId: string;
}

export interface TCreateCartResponse {
  createCart: {
    ok: boolean;
    data: ICart;
    error: string;
  };
}

const useCreateCartMutation = (
  options?: MutationHookOptions<TCreateCartResponse, TCreateCartRequestParams>,
) => {
  return useMutation<TCreateCartResponse, TCreateCartRequestParams>(
    gql`
      mutation CreateCart($productId: String!, $quantity: Int!) {
        createCart(productId: $productId, quantity: $quantity) {
          error
          ok
          data {
            id
            product
            quantity
          }
        }
      }
    `,
    options,
  );
};

export default useCreateCartMutation;

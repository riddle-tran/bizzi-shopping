import { gql, useQuery, MutationHookOptions } from '@apollo/client';

import { ICart } from 'entities/cart';

export interface TCartListRequestParams extends Partial<ICart> {
  limit?: number;
}

export interface TCartListResponse {
  getCarts: {
    ok: boolean;
    error: string;
    data: ICart[];
  };
}

const useCartListQuery = (
  options?: MutationHookOptions<TCartListResponse, TCartListRequestParams>,
) => {
  return useQuery<TCartListResponse, TCartListRequestParams>(
    gql`
      query GetCarts(
        $id: ID
        $limit: Int
        $quantity: Int
        $userId: String
        $productId: String
      ) {
        getCarts(
          id: $id
          limit: $limit
          userId: $userId
          quantity: $quantity
          productId: $productId
        ) {
          error
          ok
          data {
            id
            user
            quantity
            product {
              id
              name
              price
              thumbnail
              description
            }
          }
        }
      }
    `,
    options,
  );
};

export default useCartListQuery;

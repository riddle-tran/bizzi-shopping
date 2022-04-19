import { gql, useQuery, MutationHookOptions } from '@apollo/client';

import { IProduct } from 'entities/product';

export interface TProductListRequestParams {
  name?: string;
  limit?: number;
  price?: number;
  thumbnail?: string;
  description?: string;
}

export interface TProductListResponse {
  getProducts: {
    ok: boolean;
    error: string;
    data: IProduct[];
  };
}

const useProductListQuery = (
  options?: MutationHookOptions<
    TProductListResponse,
    TProductListRequestParams
  >,
) => {
  return useQuery<TProductListResponse, TProductListRequestParams>(
    gql`
      query GetProducts(
        $id: ID
        $name: String
        $price: Float
        $thumbnail: String
        $description: String
        $limit: Int
      ) {
        getProducts(
          id: $id
          name: $name
          price: $price
          thumbnail: $thumbnail
          description: $description
          limit: $limit
        ) {
          error
          ok
          data {
            id
            name
            price
            thumbnail
            description
          }
        }
      }
    `,
    options,
  );
};

export default useProductListQuery;

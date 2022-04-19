import { IProduct, IProductBase } from 'entities/product';
import { gql, useMutation, MutationHookOptions } from '@apollo/client';

export interface TCreateProductRequestParams extends IProductBase {}

export interface TCreateProductResponse {
  createProduct: {
    ok: boolean;
    error: string;
    data: IProduct;
  };
}

const useCreateProductMutation = (
  options?: MutationHookOptions<
    TCreateProductResponse,
    TCreateProductRequestParams
  >,
) => {
  return useMutation<TCreateProductResponse, TCreateProductRequestParams>(
    gql`
      mutation CreateProduct(
        $name: String!
        $price: Float!
        $thumbnail: String
        $description: String
      ) {
        createProduct(
          name: $name
          price: $price
          thumbnail: $thumbnail
          description: $description
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

export default useCreateProductMutation;

import { gql, useMutation, MutationHookOptions } from '@apollo/client';

export interface TDeleteCartRequestParams {
  id: string;
}

export interface TDeleteCartResponse {
  deleteCart: {
    ok: boolean;
    error: string;
  };
}

const useDeleteCartMutation = (
  options?: MutationHookOptions<TDeleteCartResponse, TDeleteCartRequestParams>,
) => {
  return useMutation<TDeleteCartResponse, TDeleteCartRequestParams>(
    gql`
      mutation DeleteCart($id: ID!) {
        deleteCart(id: $id) {
          error
          ok
        }
      }
    `,
    options,
  );
};

export default useDeleteCartMutation;

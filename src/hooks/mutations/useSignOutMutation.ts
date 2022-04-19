import { gql, useMutation, MutationHookOptions } from '@apollo/client';

export interface TSignOutRequestParams {}

export interface TSignOutResponse {
  signOut: {
    error: string;
    ok: boolean;
  };
}

const useSignOutMutation = (
  options?: MutationHookOptions<TSignOutResponse, TSignOutRequestParams>,
) => {
  return useMutation<TSignOutResponse, TSignOutRequestParams>(
    gql`
      mutation {
        signOut {
          ok
          error
        }
      }
    `,
    options,
  );
};

export default useSignOutMutation;

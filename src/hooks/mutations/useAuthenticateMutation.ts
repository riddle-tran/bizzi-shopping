import { gql, useMutation, MutationHookOptions } from '@apollo/client';

import { IUser } from 'context/AuthContext';

export interface TAuthenticateRequestParams {
  code: string;
}
export interface TAuthenticateResponse {
  signIn: {
    error: string;
    ok: boolean;
    data: {
      token: string;
      user: IUser;
    };
  };
}

const useAuthenticateMutation = (
  options?: MutationHookOptions<
    TAuthenticateResponse,
    TAuthenticateRequestParams
  >,
) => {
  return useMutation<TAuthenticateResponse, TAuthenticateRequestParams>(
    gql`
      mutation SignIn($code: String!) {
        signIn(code: $code) {
          error
          ok
          data {
            token
            user {
              id
              email
            }
          }
        }
      }
    `,
    options,
  );
};

export default useAuthenticateMutation;

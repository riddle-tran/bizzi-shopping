import { gql, useMutation, MutationHookOptions } from '@apollo/client';

import { IUser, TRole } from 'entities/user';

export interface TAuthenticateRequestParams {
  code: string;
}
export interface TAuthenticateResponse {
  signIn: {
    error: string;
    ok: boolean;
    data: {
      user: IUser;
      role: TRole;
      token: string;
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
            role
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

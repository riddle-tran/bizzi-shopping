import React, { useMemo, Dispatch } from 'react';

import useLocalStorage from 'hooks/useLocalStorage';

export type TProvider = 'Github';
export interface IUser {
  id: string;
  email: string;
  userName: string;
  avatarUrl: string;
  provide: TProvider;
  displayName: string;
}

export interface AuthState {
  user: IUser;
  token: string;
  initialized: Boolean;
}

export type AuthAction =
  | { type: 'signOut', cb?: (authState: AuthState) => void }
  | {
      type: 'signIn',
      payload: Partial<AuthState>,
      cb?: (authState: AuthState) => void,
    }
  | {
      type: 'initialize',
      payload: AuthState,
    };

export const AuthInitialState: AuthState = {
  token: '',
  initialized: false,
};

export const authReducer = (
  prevState: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'initialize': {
      const { payload } = action;
      const state: AuthState = { ...prevState, ...payload, initialized: true };
      return state;
    }
    case 'signIn': {
      const { payload, cb } = action;
      const state: AuthState = { ...prevState, ...payload, initialized: true };
      cb?.(state);
      return state;
    }
    case 'signOut': {
      const { cb } = action;
      // eslint-disable-next-line no-undef
      const state: AuthState = { ...prevState, ...payload, initialized: true };
      cb?.(state);
      return state;
    }
    default:
      throw new Error('Unexpected action');
  }
};

const authContext: {
  stored: AuthState,
  authState: AuthState,
  authDispatch: Dispatch<AuthAction>,
  setStore: (auth: AuthState) => void,
} = {
  authState: AuthInitialState,
  authDispatch: () => null,
};
export const AuthContext = React.createContext(authContext);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [authState, authDispatch] = React.useReducer(
    authReducer,
    AuthInitialState,
  );

  const { storedValue, setValue } = useLocalStorage([
    'user',
    'token',
    'initialize',
  ]);

  const authContextValue = useMemo(
    () => ({
      authState,
      stored: storedValue,
      authDispatch,
      setStore: setValue,
    }),
    [authState, setValue, storedValue],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

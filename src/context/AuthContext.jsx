import React, { useMemo, Dispatch, useEffect } from 'react';

import { IUser, TRole } from 'entities/user';
import useLocalStorage from 'hooks/useLocalStorage';

export interface AuthState {
  user?: IUser;
  role: TRole;
  token: string;
  initialized: Boolean;
}

export type AuthAction =
  | {
      type: 'initialize',
    }
  | {
      type: 'signIn',
      payload: Partial<AuthState>,
      cb?: (authState: AuthState) => void,
    }
  | {
      type: 'updateFromStorage',
      payload: Partial<AuthState>,
    }
  | { type: 'signOut', cb?: (authState: AuthState) => void };

export const AuthInitialState: AuthState = {
  user: {},
  role: 'user',
  token: undefined,
  initialized: false,
};

export const authReducer = (
  prevState: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'initialize': {
      const state: AuthState = { ...prevState, initialized: true };
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
      const state: AuthState = {
        ...prevState,
        ...AuthInitialState,
        initialized: true,
      };
      cb?.(state);
      return state;
    }
    case 'updateFromStorage': {
      const { payload } = action;
      const state: AuthState = {
        ...prevState,
        ...payload,
        initialized: true,
      };
      return state;
    }
    default:
      throw new Error('Unexpected action');
  }
};

const authContext: {
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
    'role',
    'token',
    'initialized',
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

  useEffect(() => {
    authDispatch({
      type: 'updateFromStorage',
      payload: { ...storedValue },
    });
  }, [storedValue]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

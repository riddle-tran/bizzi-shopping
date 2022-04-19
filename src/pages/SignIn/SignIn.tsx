import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringify, parse } from 'query-string';
import GithubButton from 'react-github-login-button';

import {
  GITHUB_SCOPE,
  GITHUB_CLIENT_ID,
  GITHUB_REDIRECT_URI,
  GITHUB_AUTHORIZE_URL,
} from 'configs';
import { Routes } from 'Router';
import { AuthContext } from 'context/AuthContext';
import { useAuthenticateMutation } from 'hooks/mutations';

import './SignIn.css';
import { SignInProps } from './interfaces';

const SignIn: React.FC<SignInProps> = () => {
  // Refs
  const codeRef = useRef<string>('');

  // Hooks
  const navigate = useNavigate();
  const { authState, authDispatch, setStore } = useContext(AuthContext);
  const [onSignIn, { data, loading, error }] = useAuthenticateMutation();

  // Action handlers
  const handlerLogin = useCallback(() => {
    const params = stringify({
      allow_signup: true,
      scope: GITHUB_SCOPE,
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: GITHUB_REDIRECT_URI,
    });

    const githubLoginUrl = `${GITHUB_AUTHORIZE_URL}${params}`;

    window.location.replace(githubLoginUrl);
  }, []);

  // Effects
  useEffect(() => {
    if (authState.token) {
      navigate(Routes.home.routes.products.path || '/', {
        replace: true,
      });
    } else {
      const { code } = parse(window.location.search);
      if (code && codeRef.current !== code && typeof code === 'string') {
        codeRef.current = code;
        onSignIn({ variables: { code } });
      }
    }
  }, [authState, navigate, onSignIn]);

  useEffect(() => {
    const result = data?.signIn?.data;
    if (result) {
      authDispatch({
        type: 'signIn',
        payload: {
          role: result.role,
          user: result.user,
          token: result.token,
        },
        cb: setStore,
      });
    }
  }, [data, authDispatch, setStore]);

  if (loading) return <div className='signIn'>Submitting...</div>;
  if (error)
    return <div className='signIn'>Submission error! ${error.message}</div>;

  // Renders
  return (
    <div className='signIn'>
      <GithubButton onClick={handlerLogin} />
    </div>
  );
};

export default SignIn;

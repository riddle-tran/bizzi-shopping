import React, { useCallback, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Routes } from 'Router';
import { AuthContext } from 'context/AuthContext';
import useSignOutMutation from 'hooks/mutations/useSignOutMutation';

import './BasicLayout.css';
import Assets from '../assets';

const BasicLayout: React.FC = () => {
  // States
  const [open, setOpen] = useState(false);

  // hooks
  const navigate = useNavigate();
  const { authState, authDispatch, setStore } = useContext(AuthContext);
  const [onSignOut, { loading, error }] = useSignOutMutation({
    onCompleted: ({ signOut: { ok } }) => {
      if (ok) {
        authDispatch({
          type: 'signOut',
          cb: setStore,
        });
      }
    },
  });

  // Actions handler
  const redirect = useCallback(
    (url: string) => {
      setOpen(false);
      navigate(url);
    },
    [navigate],
  );

  const burgerToggle = useCallback((bool: boolean) => {
    setOpen(bool);
  }, []);

  const signOut = useCallback(() => {
    onSignOut();
  }, [onSignOut]);

  // Renderers
  if (loading) return <div className='signIn'>Submitting...</div>;
  if (error)
    return <div className='signIn'>Submission error! ${error.message}</div>;

  return (
    <>
      <nav>
        <div className='navWide'>
          <div className='wideDiv'>
            <button
              type='button'
              onClick={() => navigate(Routes.home.routes.products.path)}
            >
              Products
            </button>
            {authState.token ? (
              <>
                <button
                  type='button'
                  onClick={() => navigate(Routes.home.routes.carts.path)}
                >
                  Carts
                </button>
                {authState.role === 'admin' && (
                  <button
                    type='button'
                    onClick={() =>
                      navigate(Routes.home.routes.createProduct.path)
                    }
                  >
                    Add product
                  </button>
                )}
                <button type='button' onClick={signOut}>
                  Sign out
                </button>
              </>
            ) : (
              <button
                type='button'
                onClick={() => navigate(Routes.signIn.path)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
        <div className='navNarrow'>
          <div className='hamburger'>
            <button type='button' onClick={() => burgerToggle(!open)}>
              <img
                src={Assets.square}
                alt='hamburger'
                className='hamburger-icon'
              />
            </button>
          </div>
          <div
            className='narrowLinks'
            style={{ display: open ? 'block' : 'none' }}
          >
            <div>
              <button
                type='button'
                onClick={() => redirect(Routes.home.routes.products.path)}
              >
                Products
              </button>
            </div>
            <div>
              {authState.token ? (
                <>
                  <button
                    type='button'
                    onClick={() => redirect(Routes.home.routes.carts.path)}
                  >
                    Carts
                  </button>
                  {authState.role === 'admin' && (
                    <button
                      type='button'
                      onClick={() =>
                        navigate(Routes.home.routes.createProduct.path)
                      }
                    >
                      Add product
                    </button>
                  )}
                  <button type='button' onClick={signOut}>
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  type='button'
                  onClick={() => navigate(Routes.signIn.path)}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default BasicLayout;

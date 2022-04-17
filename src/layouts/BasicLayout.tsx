import React, { useCallback, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Routes } from 'Router';
import Assets from '../assets';
import './BasicLayout.css';

const BasicLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const burgerToggle = useCallback((bool: boolean) => {
    setOpen(bool);
  }, []);

  const navigate = useNavigate();

  const redirect = useCallback(
    (url: string) => {
      setOpen(false);
      navigate(url);
    },
    [navigate],
  );

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
            <button
              type='button'
              onClick={() => navigate(Routes.home.routes.carts.path)}
            >
              Carts
            </button>
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
              <button
                type='button'
                onClick={() => redirect(Routes.home.routes.carts.path)}
              >
                Carts
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default BasicLayout;

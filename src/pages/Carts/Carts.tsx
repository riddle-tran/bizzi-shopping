import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Assets from 'assets';
import { Routes } from 'Router';
import Cart from 'components/Cart/Cart';

import './Carts.css';
import { CartsProps } from './interfaces';

const Carts: React.FC<CartsProps> = () => {
  // Hooks
  const navigate = useNavigate();

  // Action handlers
  const handlerRemoveCart = useCallback((id: string) => {}, []);

  // Renders
  return (
    <div>
      <div className='quantity-cart-wrapper'>
        <button
          type='button'
          className='shopping-cart-btn'
          onClick={() => navigate(Routes.home.routes.products.path)}
        >
          <img src={Assets.shoppingCart} alt='shopping cart' />
          <p>12</p>
        </button>
      </div>
      <div>
        {[].map((cart) => (
          <Cart {...cart} onRemoveCart={handlerRemoveCart} key='111' />
        ))}
      </div>
    </div>
  );
};

export default Carts;

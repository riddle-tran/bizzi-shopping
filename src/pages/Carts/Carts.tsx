import React from 'react';
import { useNavigate } from 'react-router-dom';

import Assets from 'assets';
import { Routes } from 'Router';
import { useCartListQuery } from 'hooks/queries';

import './Carts.css';
import { CartsProps } from './interfaces';

const Carts: React.FC<CartsProps> = () => {
  // Hooks
  const navigate = useNavigate();
  const { loading, error, data } = useCartListQuery({
    variables: {},
  });

  // Renders
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error! ${error.message}</div>;

  if (!data) return <div>Not found product</div>;

  const {
    getCarts: { data: carts },
  } = data;

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
        {carts.map((cart) => (
          <div key={cart.id} className='cart'>
            <div>{cart.userId}</div>-<div>{cart.quantity}</div>-
            <div>{cart.productId}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carts;

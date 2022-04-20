import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Assets from 'assets';
import { Routes } from 'Router';
import Cart from 'components/Cart';
import { useCartListQuery } from 'hooks/queries';

import './Carts.css';
import { CartsProps } from './interfaces';
import { useDeleteCartMutation } from 'hooks/mutations';

const Carts: React.FC<CartsProps> = () => {
  // Hooks
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useCartListQuery({
    variables: {},
    fetchPolicy: 'no-cache',
  });

  const [onDeleteCart, { error: errorDeleteCart, loading: loadingDeleteCart }] =
    useDeleteCartMutation({
      onCompleted: () => refetch(),
    });

  // Action handlers
  const handlerRemoveCart = useCallback(
    (id: string) => {
      onDeleteCart({
        variables: { id },
      });
    },
    [onDeleteCart],
  );

  // Renders
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error! ${error.message}</div>;

  if (!data) return <div>Not found product</div>;

  const {
    getCarts: { data: carts },
  } = data;

  return (
    <div>
      <div>{loadingDeleteCart && <div>Deleting cart</div>}</div>
      <div>{errorDeleteCart && <div>The cart fail</div>}</div>
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
          <Cart
            cart={{ ...cart }}
            key={cart.id}
            onRemoveCart={handlerRemoveCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Carts;

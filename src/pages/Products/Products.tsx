import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Assets from 'assets';
import { Routes } from 'Router';
import Product from 'components/Product/Product';

import './Products.css';
import { ProductsProps } from './interfaces';
import { useProductListQuery } from 'hooks/queries';
import useCreateCartMutation from 'hooks/mutations/useCreateCartMutation';

const Products: React.FC<ProductsProps> = () => {
  // Hooks
  const navigate = useNavigate();
  const { loading, error, data } = useProductListQuery({
    variables: {},
  });
  const [
    onCreateCart,
    { loading: creating, error: errorCart, data: cartData },
  ] = useCreateCartMutation();

  // Action handlers
  const handlerAddCart = useCallback(
    (id: string) => {
      onCreateCart({
        variables: {
          productId: id,
          quantity: 1,
        },
      });
    },
    [onCreateCart],
  );

  // Renders
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error! ${error.message}</div>;

  if (!data) return <div>Not found product</div>;

  const {
    getProducts: { data: products },
  } = data;
  return (
    <div>
      <div>{creating && <div>Creating cart</div>}</div>
      <div>{errorCart && <div>The cart fail</div>}</div>
      <div>{cartData && <div>The cart added</div>}</div>
      <div className='quantity-cart-wrapper'>
        <button
          type='button'
          className='shopping-cart-btn'
          onClick={() => navigate(Routes.home.routes.carts.path)}
        >
          <img src={Assets.shoppingCart} alt='shopping cart' />
          <p>12</p>
        </button>
      </div>

      <div>
        {products.map((product) => (
          <Product
            key={product.id}
            product={{ ...product }}
            onAddCart={handlerAddCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;

import React from 'react';

import './Products.css';
import { ProductProps } from './interfaces';

const Product: React.FC<ProductProps> = ({
  product,
  onAddCart,
}: ProductProps) => {
  // Constants
  const { id, icon, price, description } = product;

  // Renderers
  return (
    <div className='container' id={`product_${id}`}>
      <div className='flex-between'>
        <div className='product'>
          <img className='img' src={`${icon}`} alt='product avatar' />
        </div>
        <span className='price'>{price}$</span>
      </div>

      <div className='description'>{description}</div>
      <div className='add-to-cart-wrapper'>
        <button
          type='button'
          className='add-to-cart'
          onClick={() => onAddCart && onAddCart(id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;

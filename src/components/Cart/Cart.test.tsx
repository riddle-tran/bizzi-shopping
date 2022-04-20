import React from 'react';
import { render, screen } from '@testing-library/react';

import Assets from 'assets';
import { ICart } from 'entities/cart';

import Cart from './Cart';

const dataTest: ICart = {
  id: '12',
  quantity: 12,
  user: '11',
  product: {
    name: 'j',
    price: 133,
    thumbnail: 'React',
    description: 'des',
    id: '625f7219f032b44c9e0a1abf',
  },
};

test('renders cart', () => {
  render(<Cart cart={{ ...dataTest }} />);
  const cartNameTitle = screen.getByText('Cart Name');
  const descriptionTitle = screen.getByText('Short Description');
  const quantityTitle = screen.getByText('Qty');
  const priceTitle = screen.getByText('Price per 1pc');
  const totalTitle = screen.getByText('Line total');
  const removeBtnTitle = screen.getByText('Remove item');
  expect(cartNameTitle).toBeInTheDocument();
  expect(descriptionTitle).toBeInTheDocument();
  expect(quantityTitle).toBeInTheDocument();
  expect(priceTitle).toBeInTheDocument();
  expect(totalTitle).toBeInTheDocument();
  expect(removeBtnTitle).toBeInTheDocument();
});

test('Cart image', () => {
  render(<Cart cart={{ ...dataTest }} />);
  const cartImg = screen.getByRole('img');
  expect(cartImg).toHaveAttribute(
    'src',
    Assets[dataTest.product.thumbnail ?? 'Node'],
  );
  expect(cartImg).toHaveAttribute('alt', 'cart avatar');
});

import React from 'react';
import { render, screen } from '@testing-library/react';

import Cart from './Cart';
import { TCart } from './types';

const dataTest: TCart = {
  id: '1',
  price: 99,
  productName: 'tets',
  quantity: 2,
  description: ' test cart',
  icon: 'dsada',
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
  expect(cartImg).toHaveAttribute('src', dataTest.icon);
  expect(cartImg).toHaveAttribute('alt', 'cart avatar');
});

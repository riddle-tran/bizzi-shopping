import React from 'react'
import { render, screen } from '@testing-library/react'
import AppLoading from './AppLoading'

test('renders AppLoading', () => {
  render(<AppLoading />)
  const loading = screen.getByText('Loading...')
  expect(loading).toBeInTheDocument()
})

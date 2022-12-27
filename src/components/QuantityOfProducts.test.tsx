import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import QuantityOfProducts, { DEFAULT_COUNT } from './QuantityOfProducts';

test('QuantityOfProducts', async () => {
  // Initial render
  render(<QuantityOfProducts />);
  const plusButton = screen.getByText("+")
  expect(plusButton).toBeInTheDocument();

  const minusButton = screen.getByText("-")
  expect(minusButton).toBeInTheDocument();

  expect(screen.getByTestId("result").textContent).toBe(DEFAULT_COUNT.toString())

  // Increment action
  await userEvent.click(plusButton)
  expect(screen.getByTestId("result").textContent).toBe("2")

  // Decrement action
  await userEvent.click(minusButton)
  expect(screen.getByTestId("result").textContent).toBe("1")

  // Test amount isn't < 1
  await userEvent.click(minusButton)
  expect(screen.getByTestId("result").textContent).toBe("1")
});

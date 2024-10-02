import { render, screen } from '@testing-library/react';
import Header from './Header';

test('h1 is correct', () => {
  render(<Header />);
  const title = screen.getByText("u-Tomate")
  expect(title).toBeInTheDocument()
});
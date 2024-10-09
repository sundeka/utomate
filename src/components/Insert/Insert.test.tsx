import { render, screen } from '@testing-library/react';
import { Step } from '../../objects/Step';
import Insert from './Insert';

test('render plus icon by default', () => {
  const steps: Step[] = []
  render(<Insert steps={steps} update={jest.fn()} />)
  const insertionDiv = screen.getByTestId("new");
  expect(insertionDiv).toBeInTheDocument()
})
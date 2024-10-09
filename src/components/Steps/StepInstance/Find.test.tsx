import { render, screen } from '@testing-library/react';
import Find from './Find';
import { Step } from '../../../objects/Step';

test('right amount of settings', () => {
  const steps: Step[] = []
  render(<Find close={jest.fn()} steps={steps} update={jest.fn()} onUpdate={jest.fn()} />)
  const rows = screen.getAllByTestId("row");
  expect(rows.length).toBe(3)
})
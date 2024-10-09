import { render, screen } from '@testing-library/react';
import Steps from './Steps';
import { StepType } from '../../objects/StepType';
import { Step } from '../../objects/Step';

test('steps are rendered', () => {
  const steps: Step[] = [
    { id: 1, type: StepType.Find, strategy: "css", until: "presence", locator: "//a" }
  ]
  render(<Steps disableEdit={false} steps={steps} update={jest.fn()} />)
  const step = screen.getByTestId("step");
  expect(step).toBeInTheDocument()
})
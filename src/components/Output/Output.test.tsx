import { render, screen } from '@testing-library/react';
import Output from './Output';

test('loading icon is rendered', () => {
  render(<Output api={"/"} uri={undefined} setUri={jest.fn()} fileName="" isLoading={true} />)
  const loadIcon = screen.getByTestId("load-wrapper");
  expect(loadIcon).toBeInTheDocument()
})
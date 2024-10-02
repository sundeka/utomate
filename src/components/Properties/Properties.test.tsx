import { render, screen, waitFor } from '@testing-library/react';
import Properties from './Properties';

beforeEach(() => 
  render(
    <Properties 
        setName={jest.fn()}
        setWebdriver={jest.fn()}
        webdriver=""
        setHeadless={jest.fn()}
        headless={false}
    />
  )
)

test('row count', () => {
  const rows = screen.getAllByTestId("row");
  expect(rows.length).toBe(3)
})

test('available webdrivers', () => {
  const drivers = ["chrome", "firefox"]
  const options = screen.getByTestId("webdriver-selection").children
  expect(options.length).toBe(drivers.length)
  for (let i=0;i<drivers.length;i++) {
    expect(drivers[i]).toBe(options[i].getAttribute("value"))
  }
})
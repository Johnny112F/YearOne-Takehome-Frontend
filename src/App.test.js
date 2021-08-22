import { render, screen } from '@testing-library/react';
import App from './App';


describe("snapshot tests for stability", function () {
  test("shows initial home search page", function () {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  })
  test('YearOne text appears twice on home page', () => {
    render(<App />);
    const yearOneAppearances = screen.queryAllByText("YearOne");
    expect(yearOneAppearances).toHaveLength(2);
  });
});
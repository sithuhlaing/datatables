import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DataTable app', () => {
  render(<App />);
  const titleElement = screen.getByText(/Data Table/i);
  expect(titleElement).toBeInTheDocument();
});

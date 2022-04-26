import { act, render, screen } from '@testing-library/react';

import App from './App';

test('renders App', async() => {
  render(<App />);
  await act(() => {
    const linkElement = screen.getByText(/Public/i);
    expect(linkElement).toBeInTheDocument()
  })
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('ヘッダーが表示される', () => {
    render(<Header />);

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('アプリケーションタイトルが表示される', () => {
    render(<Header />);

    expect(screen.getByText('Team Divider for NAiS')).toBeInTheDocument();
  });

  it('タイトルがh1タグである', () => {
    render(<Header />);

    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('Team Divider for NAiS');
  });
});

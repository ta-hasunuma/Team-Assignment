import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('NAiSグループのバッジを表示する', () => {
    render(<Badge group="NAiS" />);

    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('NAiS');
    expect(badge).toHaveClass('badge-primary');
  });

  it('KAGグループのバッジを表示する', () => {
    render(<Badge group="KAG" />);

    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('KAG');
    expect(badge).toHaveClass('badge-secondary');
  });

  it('カスタムクラス名を追加できる', () => {
    render(<Badge group="NAiS" className="badge-lg" />);

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('badge-lg');
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('NAiSグループのバッジを表示する', () => {
    render(<Badge group="NAiS" />);

    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('NAiS');
    expect(badge).toHaveClass('bg-primary-500');
    expect(badge).toHaveClass('text-white');
  });

  it('KAGグループのバッジを表示する', () => {
    render(<Badge group="KAG" />);

    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('KAG');
    expect(badge).toHaveClass('bg-secondary-500');
    expect(badge).toHaveClass('text-white');
  });

  it('カスタムクラス名を追加できる', () => {
    render(<Badge group="NAiS" className="text-lg" />);

    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('text-lg');
  });
});

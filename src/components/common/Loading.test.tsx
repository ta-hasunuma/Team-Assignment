import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  it('ローディングスピナーを表示する', () => {
    render(<Loading />);

    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();
  });

  it('カスタムクラス名を追加できる', () => {
    render(<Loading className="my-4" />);

    const loading = screen.getByTestId('loading');
    expect(loading).toHaveClass('my-4');
  });
});

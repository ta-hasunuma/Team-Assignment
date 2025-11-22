import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('エラーアラートを表示する', () => {
    render(<Alert type="error" message="エラーが発生しました" />);

    const alert = screen.getByTestId('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('エラーが発生しました');
    expect(alert).toHaveClass('alert-error');
  });

  it('警告アラートを表示する', () => {
    render(<Alert type="warning" message="警告メッセージ" />);

    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('alert-warning');
    expect(alert).toHaveTextContent('警告メッセージ');
  });

  it('情報アラートを表示する', () => {
    render(<Alert type="info" message="情報メッセージ" />);

    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('alert-info');
  });

  it('成功アラートを表示する', () => {
    render(<Alert type="success" message="成功しました" />);

    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('alert-success');
  });

  it('カスタムクラス名を追加できる', () => {
    render(<Alert type="info" message="テスト" className="mb-4" />);

    const alert = screen.getByTestId('alert');
    expect(alert).toHaveClass('mb-4');
  });

  it('role属性がalertである', () => {
    render(<Alert type="error" message="テスト" />);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });
});

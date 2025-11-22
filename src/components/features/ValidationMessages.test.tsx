import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ValidationMessages } from './ValidationMessages';

describe('ValidationMessages', () => {
  it('エラーも警告もない場合、何も表示しない', () => {
    const { container } = render(
      <ValidationMessages errors={[]} warnings={[]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('エラーメッセージを表示する', () => {
    const errors = ['エラー1', 'エラー2'];
    render(<ValidationMessages errors={errors} warnings={[]} />);

    expect(screen.getByText('エラー1')).toBeInTheDocument();
    expect(screen.getByText('エラー2')).toBeInTheDocument();
  });

  it('警告メッセージを表示する', () => {
    const warnings = ['警告1', '警告2'];
    render(<ValidationMessages errors={[]} warnings={warnings} />);

    expect(screen.getByText('警告1')).toBeInTheDocument();
    expect(screen.getByText('警告2')).toBeInTheDocument();
  });

  it('エラーと警告の両方を表示する', () => {
    const errors = ['エラー1'];
    const warnings = ['警告1'];
    render(<ValidationMessages errors={errors} warnings={warnings} />);

    expect(screen.getByText('エラー1')).toBeInTheDocument();
    expect(screen.getByText('警告1')).toBeInTheDocument();
  });

  it('data-testid属性が正しく設定される', () => {
    const errors = ['エラー1'];
    const warnings = ['警告1'];
    render(<ValidationMessages errors={errors} warnings={warnings} />);

    expect(screen.getByTestId('validation-messages')).toBeInTheDocument();
    expect(screen.getByTestId('error-message-0')).toBeInTheDocument();
    expect(screen.getByTestId('warning-message-0')).toBeInTheDocument();
  });

  it('カスタムclassNameが適用される', () => {
    const errors = ['エラー1'];
    render(
      <ValidationMessages
        errors={errors}
        warnings={[]}
        className="custom-class"
      />
    );

    const container = screen.getByTestId('validation-messages');
    expect(container).toHaveClass('custom-class');
  });
});

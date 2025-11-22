interface AlertProps {
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  className?: string;
}

/**
 * エラーや警告を表示するアラートコンポーネント
 */
export function Alert({ type, message, className = '' }: AlertProps) {
  const alertClass = {
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
    success: 'alert-success',
  }[type];

  return (
    <div
      className={`alert ${alertClass} ${className}`}
      role="alert"
      data-testid="alert"
    >
      <span>{message}</span>
    </div>
  );
}

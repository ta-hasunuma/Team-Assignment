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
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
  }[type];

  return (
    <div
      className={`rounded-lg border p-4 ${alertClass} ${className} animate-slide-in`}
      role="alert"
      data-testid="alert"
    >
      <span>{message}</span>
    </div>
  );
}

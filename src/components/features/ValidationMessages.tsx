import { Alert } from '@/components/common/Alert';

interface ValidationMessagesProps {
  errors: string[];
  warnings: string[];
  className?: string;
}

/**
 * バリデーションエラーと警告を表示するコンポーネント
 */
export function ValidationMessages({
  errors,
  warnings,
  className = '',
}: ValidationMessagesProps) {
  if (errors.length === 0 && warnings.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`} data-testid="validation-messages">
      {errors.map((error, index) => (
        <div key={`error-${index}`} data-testid={`error-message-${index}`}>
          <Alert type="error" message={error} />
        </div>
      ))}
      {warnings.map((warning, index) => (
        <div key={`warning-${index}`} data-testid={`warning-message-${index}`}>
          <Alert type="warning" message={warning} />
        </div>
      ))}
    </div>
  );
}

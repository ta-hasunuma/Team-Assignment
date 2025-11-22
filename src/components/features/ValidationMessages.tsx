import { AlertCircle, AlertTriangle } from 'lucide-react';

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
    <div className={`space-y-3 ${className}`} data-testid="validation-messages">
      {errors.length > 0 && (
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 shadow-md">
          <div className="mb-2 flex items-center gap-2">
            <AlertCircle size={20} className="text-red-600" />
            <h3 className="font-semibold text-red-800">
              エラー ({errors.length}件)
            </h3>
          </div>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li
                key={`error-${index}`}
                className="flex items-start gap-2"
                data-testid={`error-message-${index}`}
              >
                <span className="mt-0.5 text-red-600">•</span>
                <span className="text-sm text-red-700">{error}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {warnings.length > 0 && (
        <div className="rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4 shadow-md">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle size={20} className="text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">
              警告 ({warnings.length}件)
            </h3>
          </div>
          <ul className="space-y-1">
            {warnings.map((warning, index) => (
              <li
                key={`warning-${index}`}
                className="flex items-start gap-2"
                data-testid={`warning-message-${index}`}
              >
                <span className="mt-0.5 text-yellow-600">•</span>
                <span className="text-sm text-yellow-700">{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

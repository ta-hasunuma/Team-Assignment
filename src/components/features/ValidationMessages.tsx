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
        <div className="bg-error/10 border-error/30 card border-2 shadow-md">
          <div className="card-body p-4">
            <div className="mb-2 flex items-center gap-2">
              <AlertCircle size={20} className="text-error" />
              <h3 className="font-semibold text-error">
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
                  <span className="mt-0.5 text-error">•</span>
                  <span className="text-error/90 text-sm">{error}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {warnings.length > 0 && (
        <div className="bg-warning/10 border-warning/30 card border-2 shadow-md">
          <div className="card-body p-4">
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle size={20} className="text-warning" />
              <h3 className="font-semibold text-warning">
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
                  <span className="mt-0.5 text-warning">•</span>
                  <span className="text-warning/90 text-sm">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

interface LoadingProps {
  className?: string;
}

/**
 * ローディング中に表示するスピナーコンポーネント
 */
export function Loading({ className = '' }: LoadingProps) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      data-testid="loading"
    >
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

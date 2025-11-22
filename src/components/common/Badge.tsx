import type { MemberGroup } from '@/types';

interface BadgeProps {
  group: MemberGroup;
  className?: string;
}

/**
 * メンバーのグループを表示するバッジコンポーネント
 */
export function Badge({ group, className = '' }: BadgeProps) {
  const colorClass =
    group === 'NAiS'
      ? 'bg-primary-500 text-white'
      : 'bg-secondary-500 text-white';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm ${colorClass} ${className} font-semibold transition-transform hover:scale-110`}
      data-testid="badge"
    >
      {group === 'NAiS' ? '🍺' : '📱'}
      {group}
    </span>
  );
}

import type { MemberGroup } from '@/types';

interface BadgeProps {
  group: MemberGroup;
  className?: string;
}

/**
 * メンバーのグループを表示するバッジコンポーネント
 */
export function Badge({ group, className = '' }: BadgeProps) {
  const colorClass = group === 'NAiS' ? 'badge-primary' : 'badge-secondary';

  return (
    <span className={`badge ${colorClass} ${className}`} data-testid="badge">
      {group}
    </span>
  );
}

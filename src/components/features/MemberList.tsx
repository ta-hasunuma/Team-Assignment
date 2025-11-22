import { X } from 'lucide-react';
import type { Member } from '@/types';
import { Badge } from '@/components/common/Badge';

interface MemberListProps {
  members: Member[];
  onRemove: (memberId: string) => void;
  onReset: () => void;
}

/**
 * メンバー一覧表示コンポーネント
 */
export function MemberList({ members, onRemove, onReset }: MemberListProps) {
  return (
    <div
      className="card bg-base-100 fade-in-section shadow-xl"
      data-testid="member-list"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">メンバー一覧 ({members.length}名)</h2>
          <button
            className="btn btn-sm btn-outline btn-hover-effect"
            onClick={onReset}
            data-testid="reset-button"
          >
            リセット
          </button>
        </div>

        {members.length === 0 ? (
          <p
            className="text-base-content/50 animate-fade-in py-4 text-center"
            data-testid="empty-message"
          >
            メンバーが登録されていません
          </p>
        ) : (
          <div className="max-h-96 space-y-2 overflow-y-auto">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="bg-base-200 hover-lift flex items-center justify-between rounded-lg p-3 transition-all"
                style={{ animationDelay: `${index * 50}ms` }}
                data-testid={`member-item-${member.id}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{member.name}</span>
                  <Badge group={member.group} />
                </div>
                <button
                  className="btn btn-sm btn-circle btn-ghost btn-hover-effect"
                  onClick={() => onRemove(member.id)}
                  aria-label={`${member.name}を削除`}
                  data-testid={`remove-button-${member.id}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

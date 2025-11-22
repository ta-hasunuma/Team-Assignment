import { X, Users, Trash2 } from 'lucide-react';
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
  const naisCount = members.filter((m) => m.group === 'NAiS').length;
  const kagCount = members.filter((m) => m.group === 'KAG').length;

  return (
    <div
      className="fade-in-section card border border-base-300 bg-base-100 shadow-xl"
      data-testid="member-list"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title flex items-center gap-2">
            <Users size={24} className="text-primary" />
            メンバー一覧
          </h2>
          {members.length > 0 && (
            <button
              className="btn btn-error btn-outline btn-sm gap-1"
              onClick={onReset}
              data-testid="reset-button"
            >
              <Trash2 size={16} />
              全削除
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="stats stats-vertical bg-base-200 shadow-sm lg:stats-horizontal">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Users size={32} />
            </div>
            <div className="stat-title">合計</div>
            <div className="stat-value text-primary">{members.length}</div>
            <div className="stat-desc">登録メンバー数</div>
          </div>
          <div className="stat">
            <div className="stat-title">NAiS</div>
            <div className="stat-value text-primary">{naisCount}</div>
            <div className="stat-desc">メンバー</div>
          </div>
          <div className="stat">
            <div className="stat-title">KAG</div>
            <div className="stat-value text-secondary">{kagCount}</div>
            <div className="stat-desc">メンバー</div>
          </div>
        </div>

        {members.length === 0 ? (
          <div className="py-8 text-center">
            <div className="text-base-content/30 mb-2">
              <Users size={48} className="mx-auto" />
            </div>
            <p
              className="text-base-content/50 animate-fade-in"
              data-testid="empty-message"
            >
              メンバーが登録されていません
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>名前</th>
                  <th>グループ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr
                    key={member.id}
                    className="hover"
                    data-testid={`member-item-${member.id}`}
                  >
                    <td>{index + 1}</td>
                    <td className="font-medium">{member.name}</td>
                    <td>
                      <Badge group={member.group} />
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-xs btn-circle hover:btn-error"
                        onClick={() => onRemove(member.id)}
                        aria-label={`${member.name}を削除`}
                        data-testid={`remove-button-${member.id}`}
                      >
                        <X size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

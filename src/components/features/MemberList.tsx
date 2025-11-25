import { X, Users } from 'lucide-react';
import type { Member } from '@/types';
import { Badge } from '@/components/common/Badge';

interface MemberListProps {
  members: Member[];
  onRemove: (memberId: string) => void;
}

/**
 * メンバー一覧表示コンポーネント
 */
export function MemberList({ members, onRemove }: MemberListProps) {
  const naisCount = members.filter((m) => m.group === 'NAiS').length;
  const kagCount = members.filter((m) => m.group === 'KAG').length;

  return (
    <div
      className="fade-in-section rounded-xl border border-gray-200 bg-white p-6 shadow-xl"
      data-testid="member-list"
    >
      <div className="mb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Users size={24} className="text-primary-500" />
          メンバー一覧
        </h2>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 shadow-sm lg:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="text-primary-500">
            <Users size={32} />
          </div>
          <div>
            <div className="text-xs text-gray-600">合計</div>
            <div className="text-2xl font-bold text-primary-500">
              {members.length}
            </div>
            <div className="text-xs text-gray-500">登録メンバー数</div>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-600">NAiS</div>
          <div className="text-2xl font-bold text-primary-500">{naisCount}</div>
          <div className="text-xs text-gray-500">メンバー</div>
        </div>
        <div>
          <div className="text-xs text-gray-600">KAG</div>
          <div className="text-2xl font-bold text-secondary-500">
            {kagCount}
          </div>
          <div className="text-xs text-gray-500">メンバー</div>
        </div>
      </div>

      {members.length === 0 ? (
        <div className="py-8 text-center">
          <div className="mb-2 text-gray-300">
            <Users size={48} className="mx-auto" />
          </div>
          <p
            className="animate-fade-in text-gray-400"
            data-testid="empty-message"
          >
            メンバーが登録されていません
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
                <th className="pb-2">#</th>
                <th className="pb-2">名前</th>
                <th className="pb-2">グループ</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                  data-testid={`member-item-${member.id}`}
                >
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3 font-medium">{member.name}</td>
                  <td className="py-3">
                    <Badge group={member.group} />
                  </td>
                  <td className="py-3">
                    <button
                      className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-red-100 hover:text-red-600"
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
  );
}

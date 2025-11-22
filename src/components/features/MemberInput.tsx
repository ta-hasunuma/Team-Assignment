import { useState } from 'react';
import { Plus, UserPlus } from 'lucide-react';
import type { Member, MemberGroup } from '@/types';

interface MemberInputProps {
  onAdd: (member: Member) => void;
}

/**
 * メンバー追加フォームコンポーネント
 */
export function MemberInput({ onAdd }: MemberInputProps) {
  const [name, setName] = useState('');
  const [group, setGroup] = useState<MemberGroup>('NAiS');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim() === '') {
      return;
    }

    const newMember: Member = {
      id: `member-${Date.now()}`,
      name: name.trim(),
      group,
    };

    onAdd(newMember);
    setName('');
  };

  return (
    <div
      className="card-appear rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl"
      data-testid="member-input"
    >
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
        <UserPlus size={24} className="text-primary-500" />
        メンバー追加
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="mb-2 block text-sm font-semibold text-gray-700"
            htmlFor="member-name"
          >
            名前
          </label>
          <div className="flex w-full gap-2">
            <input
              id="member-name"
              type="text"
              placeholder="メンバー名を入力"
              className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="name-input"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-primary-500 px-6 py-2 text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={name.trim() === ''}
              data-testid="add-button"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            グループ
          </label>
          <div className="flex gap-4" data-testid="group-select">
            <label className="flex flex-1 cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="group"
                className="h-4 w-4 text-primary-500 focus:ring-2 focus:ring-primary-200"
                value="NAiS"
                checked={group === 'NAiS'}
                onChange={(e) => setGroup(e.target.value as MemberGroup)}
              />
              <span className="font-medium">NAiS</span>
            </label>
            <label className="flex flex-1 cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="group"
                className="h-4 w-4 text-secondary-500 focus:ring-2 focus:ring-secondary-200"
                value="KAG"
                checked={group === 'KAG'}
                onChange={(e) => setGroup(e.target.value as MemberGroup)}
              />
              <span className="font-medium">KAG</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

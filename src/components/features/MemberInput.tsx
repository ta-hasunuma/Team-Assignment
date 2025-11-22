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
      className="card-appear card border border-base-300 bg-gradient-to-br from-base-100 to-base-200 shadow-xl"
      data-testid="member-input"
    >
      <div className="card-body">
        <h2 className="card-title flex items-center gap-2">
          <UserPlus size={24} className="text-primary" />
          メンバー追加
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="member-name">
              <span className="label-text font-semibold">名前</span>
            </label>
            <div className="w-full join">
              <input
                id="member-name"
                type="text"
                placeholder="メンバー名を入力"
                className="input-bordered input w-full join-item focus:outline-offset-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="name-input"
              />
              <button
                type="submit"
                className="btn btn-primary join-item"
                disabled={name.trim() === ''}
                data-testid="add-button"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">グループ</span>
            </label>
            <div className="flex gap-4" data-testid="group-select">
              <label className="label flex-1 cursor-pointer gap-2">
                <input
                  type="radio"
                  name="group"
                  className="radio radio-primary"
                  value="NAiS"
                  checked={group === 'NAiS'}
                  onChange={(e) => setGroup(e.target.value as MemberGroup)}
                />
                <span className="label-text font-medium">NAiS</span>
              </label>
              <label className="label flex-1 cursor-pointer gap-2">
                <input
                  type="radio"
                  name="group"
                  className="radio radio-secondary"
                  value="KAG"
                  checked={group === 'KAG'}
                  onChange={(e) => setGroup(e.target.value as MemberGroup)}
                />
                <span className="label-text font-medium">KAG</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

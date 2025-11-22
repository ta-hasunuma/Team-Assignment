import { useState } from 'react';
import { Plus } from 'lucide-react';
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
      className="card bg-base-100 card-appear shadow-xl"
      data-testid="member-input"
    >
      <div className="card-body">
        <h2 className="card-title">メンバー追加</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="member-name">
              <span className="label-text">名前</span>
            </label>
            <input
              id="member-name"
              type="text"
              placeholder="メンバー名を入力"
              className="input input-bordered focus:ring-primary focus:ring-opacity-50 w-full transition-all focus:ring"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="name-input"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="member-group">
              <span className="label-text">グループ</span>
            </label>
            <select
              id="member-group"
              className="select select-bordered focus:ring-primary focus:ring-opacity-50 w-full transition-all focus:ring"
              value={group}
              onChange={(e) => setGroup(e.target.value as MemberGroup)}
              data-testid="group-select"
            >
              <option value="NAiS">NAiS</option>
              <option value="KAG">KAG</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-hover-effect w-full"
            disabled={name.trim() === ''}
            data-testid="add-button"
          >
            <Plus size={20} />
            追加
          </button>
        </form>
      </div>
    </div>
  );
}

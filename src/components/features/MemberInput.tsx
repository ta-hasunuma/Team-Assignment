import { useState } from 'react';
import { Plus, UserPlus, ChevronDown } from 'lucide-react';
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
  const [isOpen, setIsOpen] = useState(false);

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
    <details
      className="card-appear rounded-lg border border-gray-200 bg-white shadow-sm"
      data-testid="member-input"
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex cursor-pointer items-center justify-between p-3 text-sm font-semibold text-gray-600 hover:bg-gray-50">
        <div className="flex items-center gap-2">
          <UserPlus size={18} className="text-gray-400" />
          メンバー追加
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </summary>

      <form onSubmit={handleSubmit} className="space-y-3 p-4 pt-0">
        <div className="flex w-full gap-2">
          <input
            id="member-name"
            type="text"
            placeholder="名前を入力"
            className="flex-1 rounded-l-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="name-input"
          />
          <button
            type="submit"
            className="rounded-r-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={name.trim() === ''}
            data-testid="add-button"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="flex gap-3 text-sm" data-testid="group-select">
          <label className="flex flex-1 cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="group"
              className="h-3.5 w-3.5 text-primary-500 focus:ring-1 focus:ring-primary-200"
              value="NAiS"
              checked={group === 'NAiS'}
              onChange={(e) => setGroup(e.target.value as MemberGroup)}
            />
            <span className="text-gray-600">NAiS</span>
          </label>
          <label className="flex flex-1 cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="group"
              className="h-3.5 w-3.5 text-secondary-500 focus:ring-1 focus:ring-secondary-200"
              value="KAG"
              checked={group === 'KAG'}
              onChange={(e) => setGroup(e.target.value as MemberGroup)}
            />
            <span className="text-gray-600">KAG</span>
          </label>
        </div>
      </form>
    </details>
  );
}

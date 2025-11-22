import { Users } from 'lucide-react';

interface TeamConfigProps {
  totalTeams: number;
  onUpdate: (totalTeams: number) => void;
}

/**
 * チーム数設定コンポーネント
 */
export function TeamConfig({ totalTeams, onUpdate }: TeamConfigProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      onUpdate(value);
    }
  };

  return (
    <div className="animate-fade-in" data-testid="team-config">
      <label
        className="mb-2 flex items-center justify-between"
        htmlFor="total-teams"
      >
        <span className="flex items-center gap-2 font-semibold">
          <Users size={18} className="text-primary-500" />
          全体のWIP数
        </span>
        <span className="inline-flex items-center rounded-full bg-primary-500 px-3 py-1 text-sm font-bold text-white">
          {totalTeams}
        </span>
      </label>
      <input
        id="total-teams"
        type="range"
        min="1"
        max="20"
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary-500"
        value={totalTeams}
        onInput={handleChange}
        data-testid="total-teams-input"
      />
      <div className="mt-2 flex w-full justify-between px-2 text-xs text-gray-500">
        <span>1</span>
        <span>5</span>
        <span>10</span>
        <span>15</span>
        <span>20</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        作成するチーム数を指定してください
      </p>
    </div>
  );
}

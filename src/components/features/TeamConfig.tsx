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
    <div className="form-control animate-fade-in" data-testid="team-config">
      <label className="label" htmlFor="total-teams">
        <span className="label-text flex items-center gap-2 font-semibold">
          <Users size={18} className="text-primary" />
          全体のWIP数
        </span>
        <span className="label-text-alt badge badge-primary badge-lg font-bold">
          {totalTeams}
        </span>
      </label>
      <input
        id="total-teams"
        type="range"
        min="1"
        max="20"
        className="range range-primary"
        value={totalTeams}
        onInput={handleChange}
        data-testid="total-teams-input"
      />
      <div className="mt-2 flex w-full justify-between px-2 text-xs">
        <span>1</span>
        <span>5</span>
        <span>10</span>
        <span>15</span>
        <span>20</span>
      </div>
      <label className="label">
        <span className="label-text-alt text-base-content/70">
          作成するチーム数を指定してください
        </span>
      </label>
    </div>
  );
}

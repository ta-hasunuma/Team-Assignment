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
        <span className="label-text font-semibold">全体のWIP数</span>
      </label>
      <input
        id="total-teams"
        type="number"
        min="1"
        max="20"
        className="input input-bordered focus:ring-primary focus:ring-opacity-50 transition-all focus:ring"
        value={totalTeams}
        onChange={handleChange}
        data-testid="total-teams-input"
      />
      <label className="label">
        <span className="label-text-alt">
          作成するチーム数を指定してください
        </span>
      </label>
    </div>
  );
}

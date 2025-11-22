import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { PatternRule, TeamType } from '@/types';

interface PatternRuleListProps {
  rules: PatternRule[];
  onAdd: (rule: PatternRule) => void;
  onRemove: (ruleId: string) => void;
}

/**
 * パターンルール管理コンポーネント
 */
export function PatternRuleList({
  rules,
  onAdd,
  onRemove,
}: PatternRuleListProps) {
  const [type, setType] = useState<TeamType>('NAiS_ONLY');
  const [teamCount, setTeamCount] = useState(1);
  const [membersPerTeam, setMembersPerTeam] = useState(3);

  const handleAdd = () => {
    const newRule: PatternRule = {
      id: `rule-${Date.now()}`,
      type,
      teamCount,
      membersPerTeam,
    };

    onAdd(newRule);
    // リセット
    setTeamCount(1);
    setMembersPerTeam(3);
  };

  const getTypeLabel = (type: TeamType): string => {
    switch (type) {
      case 'NAiS_ONLY':
        return 'NAiSのみ';
      case 'KAG_ONLY':
        return 'KAGのみ';
      case 'MIXED':
        return '混合';
    }
  };

  return (
    <div className="animate-fade-in space-y-4" data-testid="pattern-rule-list">
      <h3 className="font-semibold">パターン制約</h3>

      {/* 既存ルール一覧 */}
      {rules.length > 0 && (
        <div className="space-y-2">
          {rules.map((rule, index) => (
            <div
              key={rule.id}
              className="bg-base-200 hover-lift flex items-center justify-between rounded-lg p-3 transition-all"
              style={{ animationDelay: `${index * 50}ms` }}
              data-testid={`rule-item-${rule.id}`}
            >
              <div className="text-sm">
                <span className="font-medium">{getTypeLabel(rule.type)}</span>
                <span className="text-base-content/70 ml-2">
                  {rule.teamCount}チーム × {rule.membersPerTeam}名
                </span>
              </div>
              <button
                className="btn btn-sm btn-circle btn-ghost btn-hover-effect"
                onClick={() => onRemove(rule.id)}
                aria-label="ルールを削除"
                data-testid={`remove-rule-${rule.id}`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ルール追加フォーム */}
      <div className="bg-base-200 space-y-3 rounded-lg p-4">
        <div className="form-control">
          <label className="label" htmlFor="rule-type">
            <span className="label-text">チームタイプ</span>
          </label>
          <select
            id="rule-type"
            className="select select-bordered select-sm focus:ring-primary focus:ring-opacity-50 transition-all focus:ring"
            value={type}
            onChange={(e) => setType(e.target.value as TeamType)}
            data-testid="rule-type-select"
          >
            <option value="NAiS_ONLY">NAiSのみ</option>
            <option value="KAG_ONLY">KAGのみ</option>
            <option value="MIXED">混合</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="form-control">
            <label className="label" htmlFor="rule-team-count">
              <span className="label-text">チーム数</span>
            </label>
            <input
              id="rule-team-count"
              type="number"
              min="1"
              max="10"
              className="input input-bordered input-sm focus:ring-primary focus:ring-opacity-50 transition-all focus:ring"
              value={teamCount}
              onChange={(e) => setTeamCount(parseInt(e.target.value, 10) || 1)}
              data-testid="rule-team-count-input"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="rule-members-per-team">
              <span className="label-text">1チームの人数</span>
            </label>
            <input
              id="rule-members-per-team"
              type="number"
              min="1"
              max="10"
              className="input input-bordered input-sm focus:ring-primary focus:ring-opacity-50 transition-all focus:ring"
              value={membersPerTeam}
              onChange={(e) =>
                setMembersPerTeam(parseInt(e.target.value, 10) || 1)
              }
              data-testid="rule-members-per-team-input"
            />
          </div>
        </div>

        <button
          className="btn btn-sm btn-outline btn-hover-effect w-full"
          onClick={handleAdd}
          data-testid="add-rule-button"
        >
          <Plus size={16} />
          ルールを追加
        </button>
      </div>
    </div>
  );
}

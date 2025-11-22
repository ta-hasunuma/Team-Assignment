import { useState } from 'react';
import { X, Plus, Layers, Target } from 'lucide-react';
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
      <div className="flex items-center gap-2">
        <Target size={20} className="text-accent" />
        <h3 className="font-semibold">パターン制約</h3>
        {rules.length > 0 && (
          <span className="badge badge-accent badge-sm">{rules.length}</span>
        )}
      </div>

      {/* 既存ルール一覧 */}
      {rules.length > 0 && (
        <div className="space-y-2">
          {rules.map((rule, index) => {
            const typeColor =
              rule.type === 'NAiS_ONLY'
                ? 'badge-primary'
                : rule.type === 'KAG_ONLY'
                  ? 'badge-secondary'
                  : 'badge-accent';
            return (
              <div
                key={rule.id}
                className="alert shadow-sm transition-all hover:shadow-md"
                style={{ animationDelay: `${index * 50}ms` }}
                data-testid={`rule-item-${rule.id}`}
              >
                <Layers size={20} />
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`badge ${typeColor} badge-sm`}>
                      {getTypeLabel(rule.type)}
                    </span>
                  </div>
                  <div className="text-base-content/70 text-sm">
                    {rule.teamCount}チーム × {rule.membersPerTeam}名
                  </div>
                </div>
                <button
                  className="btn btn-ghost btn-sm btn-circle hover:btn-error"
                  onClick={() => onRemove(rule.id)}
                  aria-label="ルールを削除"
                  data-testid={`remove-rule-${rule.id}`}
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ルール追加フォーム */}
      <div className="collapse collapse-arrow bg-base-200 shadow-sm">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title flex items-center gap-2 font-medium">
          <Plus size={18} />
          新しいルールを追加
        </div>
        <div className="collapse-content space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="rule-type">
              <span className="label-text font-semibold">チームタイプ</span>
            </label>
            <div className="w-full join" data-testid="rule-type-select">
              <button
                type="button"
                className={`btn flex-1 join-item ${type === 'NAiS_ONLY' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setType('NAiS_ONLY')}
              >
                🚀 NAiSのみ
              </button>
              <button
                type="button"
                className={`btn flex-1 join-item ${type === 'KAG_ONLY' ? 'btn-secondary' : 'btn-outline'}`}
                onClick={() => setType('KAG_ONLY')}
              >
                🎯 KAGのみ
              </button>
              <button
                type="button"
                className={`btn flex-1 join-item ${type === 'MIXED' ? 'btn-accent' : 'btn-outline'}`}
                onClick={() => setType('MIXED')}
              >
                ⚡ 混合
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label" htmlFor="rule-team-count">
                <span className="label-text font-semibold">チーム数</span>
                <span className="label-text-alt badge badge-sm">
                  {teamCount}
                </span>
              </label>
              <input
                id="rule-team-count"
                type="range"
                min="1"
                max="10"
                className="range range-primary range-sm"
                value={teamCount}
                onInput={(e) =>
                  setTeamCount(parseInt(e.currentTarget.value, 10))
                }
                data-testid="rule-team-count-input"
              />
              <div className="mt-1 flex w-full justify-between px-2 text-xs">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="rule-members-per-team">
                <span className="label-text font-semibold">1チームの人数</span>
                <span className="label-text-alt badge badge-sm">
                  {membersPerTeam}
                </span>
              </label>
              <input
                id="rule-members-per-team"
                type="range"
                min="1"
                max="10"
                className="range range-secondary range-sm"
                value={membersPerTeam}
                onInput={(e) =>
                  setMembersPerTeam(parseInt(e.currentTarget.value, 10))
                }
                data-testid="rule-members-per-team-input"
              />
              <div className="mt-1 flex w-full justify-between px-2 text-xs">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <button
            className="btn btn-accent w-full gap-2"
            onClick={handleAdd}
            data-testid="add-rule-button"
          >
            <Plus size={18} />
            ルールを追加
          </button>
        </div>
      </div>
    </div>
  );
}

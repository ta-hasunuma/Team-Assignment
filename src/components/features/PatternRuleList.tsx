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
        <Target size={20} className="text-cyan-500" />
        <h3 className="font-semibold">パターン制約</h3>
        {rules.length > 0 && (
          <span className="inline-flex items-center rounded-full bg-cyan-100 px-2 py-0.5 text-xs text-cyan-700">
            {rules.length}
          </span>
        )}
      </div>

      {/* 既存ルール一覧 */}
      {rules.length > 0 && (
        <div className="space-y-2">
          {rules.map((rule, index) => {
            const typeColor =
              rule.type === 'NAiS_ONLY'
                ? 'bg-primary-100 text-primary-700'
                : rule.type === 'KAG_ONLY'
                  ? 'bg-secondary-100 text-secondary-700'
                  : 'bg-cyan-100 text-cyan-700';
            return (
              <div
                key={rule.id}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                style={{ animationDelay: `${index * 50}ms` }}
                data-testid={`rule-item-${rule.id}`}
              >
                <Layers size={20} className="text-gray-600" />
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${typeColor}`}
                    >
                      {getTypeLabel(rule.type)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {rule.teamCount}チーム × {rule.membersPerTeam}名
                  </div>
                </div>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-red-100 hover:text-red-600"
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
      <details className="rounded-lg bg-gray-50 shadow-sm">
        <summary className="flex cursor-pointer items-center gap-2 p-4 font-medium">
          <Plus size={18} />
          新しいルールを追加
        </summary>
        <div className="space-y-4 p-4 pt-0">
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              htmlFor="rule-type"
            >
              チームタイプ
            </label>
            <div className="flex w-full gap-2" data-testid="rule-type-select">
              <button
                type="button"
                className={`flex-1 rounded-lg px-4 py-2 font-medium transition-colors ${
                  type === 'NAiS_ONLY'
                    ? 'bg-primary-500 text-white'
                    : 'border border-gray-300 bg-white hover:bg-gray-50'
                }`}
                onClick={() => setType('NAiS_ONLY')}
              >
                🍺 NAiSのみ
              </button>
              <button
                type="button"
                className={`flex-1 rounded-lg px-4 py-2 font-medium transition-colors ${
                  type === 'KAG_ONLY'
                    ? 'bg-secondary-500 text-white'
                    : 'border border-gray-300 bg-white hover:bg-gray-50'
                }`}
                onClick={() => setType('KAG_ONLY')}
              >
                📱 KAGのみ
              </button>
              <button
                type="button"
                className={`flex-1 rounded-lg px-4 py-2 font-medium transition-colors ${
                  type === 'MIXED'
                    ? 'bg-cyan-500 text-white'
                    : 'border border-gray-300 bg-white hover:bg-gray-50'
                }`}
                onClick={() => setType('MIXED')}
              >
                ⚡ 混合
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="mb-2 flex items-center justify-between text-sm font-semibold"
                htmlFor="rule-team-count"
              >
                <span>チーム数</span>
                <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs">
                  {teamCount}
                </span>
              </label>
              <input
                id="rule-team-count"
                type="range"
                min="1"
                max="10"
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary-500"
                value={teamCount}
                onInput={(e) =>
                  setTeamCount(parseInt(e.currentTarget.value, 10))
                }
                data-testid="rule-team-count-input"
              />
              <div className="mt-1 flex w-full justify-between px-2 text-xs text-gray-500">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>

            <div>
              <label
                className="mb-2 flex items-center justify-between text-sm font-semibold"
                htmlFor="rule-members-per-team"
              >
                <span>1チームの人数</span>
                <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs">
                  {membersPerTeam}
                </span>
              </label>
              <input
                id="rule-members-per-team"
                type="range"
                min="1"
                max="10"
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-secondary-500"
                value={membersPerTeam}
                onInput={(e) =>
                  setMembersPerTeam(parseInt(e.currentTarget.value, 10))
                }
                data-testid="rule-members-per-team-input"
              />
              <div className="mt-1 flex w-full justify-between px-2 text-xs text-gray-500">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-white transition-colors hover:bg-cyan-600"
            onClick={handleAdd}
            data-testid="add-rule-button"
          >
            <Plus size={18} />
            ルールを追加
          </button>
        </div>
      </details>
    </div>
  );
}

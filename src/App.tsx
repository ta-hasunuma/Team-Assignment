import { Header } from '@/components/layout/Header';
import { MemberList } from '@/components/features/MemberList';
import { MemberInput } from '@/components/features/MemberInput';
import { TeamConfig } from '@/components/features/TeamConfig';
import { PatternRuleList } from '@/components/features/PatternRuleList';
import { ValidationMessages } from '@/components/features/ValidationMessages';
import { Loading } from '@/components/common/Loading';
import { useTeamStore } from '@/store/teamStore';
import { useValidation } from '@/hooks/useValidation';
import { Users } from 'lucide-react';

function App() {
  const {
    members,
    config,
    teams,
    isLoading,
    error,
    addMember,
    removeMember,
    resetMembers,
    updateConfig,
    addPatternRule,
    removePatternRule,
    createTeams,
    clearTeams,
  } = useTeamStore();

  const validation = useValidation(members, config);

  const handleCreateTeams = () => {
    if (validation.isValid) {
      createTeams();
    }
  };

  return (
    <div className="bg-base-100 min-h-screen" data-testid="app">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* 左カラム: メンバー管理 */}
          <div className="space-y-6">
            <MemberInput onAdd={addMember} />
            <MemberList
              members={members}
              onRemove={removeMember}
              onReset={resetMembers}
            />
          </div>

          {/* 右カラム: チーム設定 */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">チーム設定</h2>
                <TeamConfig
                  totalTeams={config.totalTeams}
                  onUpdate={(totalTeams) => updateConfig({ totalTeams })}
                />
                <div className="divider" />
                <PatternRuleList
                  rules={config.rules}
                  onAdd={addPatternRule}
                  onRemove={removePatternRule}
                />
              </div>
            </div>

            {/* バリデーションメッセージ */}
            <ValidationMessages
              errors={validation.errors}
              warnings={validation.warnings}
            />

            {/* チーム作成ボタン */}
            <button
              className="btn btn-primary btn-hover-effect btn-lg w-full"
              onClick={handleCreateTeams}
              disabled={!validation.isValid || isLoading}
              data-testid="create-teams-button"
            >
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <Users size={24} />
                  チームを作成
                </>
              )}
            </button>

            {/* エラー表示 */}
            {error && (
              <div className="alert alert-error animate-slide-in">
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* チーム結果表示 */}
        {teams.length > 0 && (
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">チーム分け結果</h2>
              <button
                className="btn btn-outline btn-sm"
                onClick={clearTeams}
                data-testid="clear-teams-button"
              >
                結果をクリア
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="card bg-base-200 hover-lift shadow-md"
                  data-testid={`team-card-${team.id}`}
                >
                  <div className="card-body">
                    <h3 className="card-title">{team.name}</h3>
                    <ul className="space-y-1">
                      {team.members.map((member) => (
                        <li key={member.id} className="flex items-center gap-2">
                          <span>{member.name}</span>
                          <span className="badge badge-sm badge-outline">
                            {member.group}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

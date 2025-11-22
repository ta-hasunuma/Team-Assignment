import { Header } from '@/components/layout/Header';
import { MemberList } from '@/components/features/MemberList';
import { MemberInput } from '@/components/features/MemberInput';
import { TeamConfig } from '@/components/features/TeamConfig';
import { PatternRuleList } from '@/components/features/PatternRuleList';
import { ValidationMessages } from '@/components/features/ValidationMessages';
import { Loading } from '@/components/common/Loading';
import { useTeamStore } from '@/store/teamStore';
import { useValidation } from '@/hooks/useValidation';
import { Users, Sparkles, Trophy } from 'lucide-react';

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
    <div
      className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100"
      data-testid="app"
    >
      <Header />

      <main className="container mx-auto max-w-7xl px-4 py-8">
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
            <div className="card border border-base-300 bg-gradient-to-br from-base-100 to-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title flex items-center gap-2">
                  <Sparkles size={24} className="text-accent" />
                  チーム設定
                </h2>
                <TeamConfig
                  totalTeams={config.totalTeams}
                  onUpdate={(totalTeams) => updateConfig({ totalTeams })}
                />
                <div className="divider divider-accent">制約ルール</div>
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
              className="btn btn-primary btn-lg w-full gap-2 shadow-lg transition-all hover:shadow-xl"
              onClick={handleCreateTeams}
              disabled={!validation.isValid || isLoading}
              data-testid="create-teams-button"
            >
              {isLoading ? (
                <>
                  <Loading />
                  <span>チームを作成中...</span>
                </>
              ) : (
                <>
                  <Users size={24} />
                  チームを作成
                  <Trophy size={20} />
                </>
              )}
            </button>

            {/* エラー表示 */}
            {error && (
              <div
                role="alert"
                className="alert alert-error animate-slide-in shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* チーム結果表示 */}
        {teams.length > 0 && (
          <div className="mt-12">
            <div className="from-primary/10 to-secondary/10 hero mb-6 rounded-box bg-gradient-to-r">
              <div className="hero-content py-8 text-center">
                <div className="max-w-md">
                  <Trophy size={48} className="mx-auto mb-4 text-primary" />
                  <h2 className="mb-4 flex items-center justify-center gap-3 text-3xl font-bold">
                    <Sparkles className="text-accent" />
                    チーム分け結果
                    <Sparkles className="text-accent" />
                  </h2>
                  <p className="text-base-content/70 mb-4">
                    {teams.length}つのチームが作成されました
                  </p>
                  <button
                    className="btn btn-outline btn-sm gap-2"
                    onClick={clearTeams}
                    data-testid="clear-teams-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    結果をクリア
                  </button>
                </div>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teams.map((team, index) => (
                <div
                  key={team.id}
                  className="hover-lift border-primary/20 card border-2 bg-gradient-to-br from-base-100 to-base-200 shadow-xl"
                  data-testid={`team-card-${team.id}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="card-body">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="card-title text-2xl">{team.name}</h3>
                      <div className="badge badge-primary badge-lg">
                        {team.members.length}人
                      </div>
                    </div>
                    <div className="divider my-1"></div>
                    <ul className="space-y-2">
                      {team.members.map((member, idx) => (
                        <li
                          key={member.id}
                          className="bg-base-200/50 hover:bg-base-300/50 flex items-center gap-3 rounded-lg p-2 transition-colors"
                        >
                          <div className="placeholder avatar">
                            <div className="bg-neutral-focus w-8 rounded-full text-neutral-content">
                              <span className="text-xs">{idx + 1}</span>
                            </div>
                          </div>
                          <span className="flex-1 font-medium">
                            {member.name}
                          </span>
                          <span
                            className={`badge ${member.group === 'NAiS' ? 'badge-primary' : 'badge-secondary'}`}
                          >
                            {member.group === 'NAiS' ? '🚀' : '🎯'}{' '}
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

import { Header } from '@/components/layout/Header';
import { MemberList } from '@/components/features/MemberList';
import { MemberInput } from '@/components/features/MemberInput';
import { TeamConfig } from '@/components/features/TeamConfig';
import { PatternRuleList } from '@/components/features/PatternRuleList';
import { ValidationMessages } from '@/components/features/ValidationMessages';
import { Loading } from '@/components/common/Loading';
import { useTeamStore } from '@/store/teamStore';
import { useValidation } from '@/hooks/useValidation';
import { Users, Sparkles, Trophy, Copy } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import * as htmlToImage from 'html-to-image';

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
  const resultsRef = useRef<HTMLDivElement>(null);
  const teamsGridRef = useRef<HTMLDivElement>(null);
  const [isCopyingAll, setIsCopyingAll] = useState(false);

  const handleCopyAllTeamsAsImage = async () => {
    if (!teamsGridRef.current) return;

    try {
      setIsCopyingAll(true);
      const dataUrl = await htmlToImage.toPng(teamsGridRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#f9fafb',
      });

      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setTimeout(() => setIsCopyingAll(false), 1000);
    } catch (error) {
      console.error('Failed to copy image:', error);
      setIsCopyingAll(false);
    }
  };

  const handleCreateTeams = () => {
    if (validation.isValid) {
      createTeams();
    }
  };

  // チーム作成後に結果へ自動スクロール
  useEffect(() => {
    if (teams.length > 0 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [teams.length]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50"
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
            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Sparkles size={24} className="text-cyan-500" />
                チーム設定
              </h2>
              <TeamConfig
                totalTeams={config.totalTeams}
                onUpdate={(totalTeams) => updateConfig({ totalTeams })}
              />
              <div className="my-6 border-t border-cyan-200"></div>
              <PatternRuleList
                rules={config.rules}
                onAdd={addPatternRule}
                onRemove={removePatternRule}
              />
            </div>

            {/* バリデーションメッセージ */}
            <ValidationMessages
              errors={validation.errors}
              warnings={validation.warnings}
            />

            {/* チーム作成ボタン */}
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-600 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-300"
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

            {/* 結果へのスクロールインジケーター */}
            {teams.length > 0 && (
              <button
                onClick={() =>
                  resultsRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }
                className="flex w-full animate-bounce-soft items-center justify-center gap-2 rounded-lg border-2 border-primary-300 bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-700 transition-all hover:bg-primary-100"
              >
                <Trophy size={18} />
                チーム結果を見る
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}

            {/* エラー表示 */}
            {error && (
              <div
                role="alert"
                className="flex animate-slide-in items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-800">{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* チーム結果表示 */}
        {teams.length > 0 && (
          <div ref={resultsRef} className="mt-12 scroll-mt-20">
            <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50 p-8 text-center">
              <Trophy
                size={48}
                className="mx-auto mb-4 animate-bounce-soft text-primary-500"
              />
              <h2 className="mb-4 flex items-center justify-center gap-3 text-3xl font-bold">
                <Sparkles className="text-cyan-500" />
                チーム分け結果
                <Sparkles className="text-cyan-500" />
              </h2>
              <p className="mb-4 text-gray-600">
                {teams.length}つのチームが作成されました
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-500 bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleCopyAllTeamsAsImage}
                  disabled={isCopyingAll}
                  data-testid="copy-all-teams-button"
                >
                  {isCopyingAll ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>コピー中...</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>画像としてコピー</span>
                    </>
                  )}
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50"
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
            <div
              ref={teamsGridRef}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {teams.map((team, index) => (
                <div
                  key={team.id}
                  className="hover-lift relative rounded-xl border-2 border-primary-200 bg-gradient-to-br from-white to-gray-50 p-6 transition-transform"
                  data-testid={`team-card-${team.id}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{team.name}</h3>
                    <div className="inline-flex items-center rounded-full bg-primary-500 px-3 py-1 text-sm font-semibold text-white">
                      {team.members.length}人
                    </div>
                  </div>
                  <div className="my-3 border-t border-gray-200"></div>
                  <ul className="space-y-2">
                    {team.members.map((member, idx) => (
                      <li
                        key={member.id}
                        className="flex items-center gap-3 rounded-lg bg-gray-100/50 p-2 transition-colors hover:bg-gray-200/50"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-xs text-white">
                          {idx + 1}
                        </div>
                        <span className="flex-1 font-medium">
                          {member.name}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-xs ${
                            member.group === 'NAiS'
                              ? 'bg-primary-500 text-white'
                              : 'bg-secondary-500 text-white'
                          }`}
                        >
                          <span>{member.group === 'NAiS' ? '🍺' : '📱'}</span>
                          <span>{member.group}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
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

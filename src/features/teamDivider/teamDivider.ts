import type { Member, Team, TeamConfig, PatternRule } from '@/types';
import { validateConfig } from './validator';

/**
 * 配列をランダムにシャッフルする（Fisher-Yatesアルゴリズム）
 * @param array - シャッフルする配列
 * @returns シャッフルされた新しい配列（元の配列は変更しない）
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * パターン制約に基づいてチームを作成する
 */
function applyPatternRules(
  members: Member[],
  rules: PatternRule[]
): { teams: Team[]; remainingMembers: Member[] } {
  const teams: Team[] = [];
  const remainingMembers = [...members];

  rules.forEach((rule) => {
    for (let i = 0; i < rule.teamCount; i++) {
      const team: Team = {
        id: `team-${teams.length + 1}`,
        name: `WIP ${teams.length + 1}`,
        members: [],
        type: rule.type,
      };

      // ルールに基づいてメンバーを選択
      const targetGroup = rule.type === 'NAiS_ONLY' ? 'NAiS' : 'KAG';
      const selectedMembers: Member[] = [];

      for (let j = 0; j < rule.membersPerTeam; j++) {
        const memberIndex = remainingMembers.findIndex(
          (m) => m.group === targetGroup
        );
        if (memberIndex !== -1) {
          selectedMembers.push(remainingMembers[memberIndex]);
          remainingMembers.splice(memberIndex, 1);
        }
      }

      team.members = selectedMembers;
      teams.push(team);
    }
  });

  return { teams, remainingMembers };
}

/**
 * 残りのメンバーをチームに分割する
 */
function divideRemainingMembers(
  members: Member[],
  teamCount: number,
  existingTeamCount: number
): Team[] {
  const teams: Team[] = [];
  const shuffledMembers = shuffleArray(members);
  const membersPerTeam = Math.floor(shuffledMembers.length / teamCount);
  const remainder = shuffledMembers.length % teamCount;

  let memberIndex = 0;

  for (let i = 0; i < teamCount; i++) {
    const team: Team = {
      id: `team-${existingTeamCount + i + 1}`,
      name: `WIP ${existingTeamCount + i + 1}`,
      members: [],
    };

    // 基本人数を割り当て
    const currentTeamSize = membersPerTeam + (i < remainder ? 1 : 0);
    team.members = shuffledMembers.slice(
      memberIndex,
      memberIndex + currentTeamSize
    );
    memberIndex += currentTeamSize;

    teams.push(team);
  }

  return teams;
}

/**
 * チーム分けメイン関数
 * @param members - 全メンバーリスト
 * @param config - チーム分け設定
 * @returns 生成されたチームリスト
 */
export function divideTeams(members: Member[], config: TeamConfig): Team[] {
  // バリデーション
  const validation = validateConfig(members, config);
  if (!validation.isValid) {
    throw new Error(validation.errors[0].message);
  }

  // パターン制約を適用
  const { teams: patternTeams, remainingMembers } = applyPatternRules(
    members,
    config.rules
  );

  // 残りのメンバーを振り分け
  const remainingTeamCount = config.totalTeams - patternTeams.length;
  const remainingTeams = divideRemainingMembers(
    remainingMembers,
    remainingTeamCount,
    patternTeams.length
  );

  return [...patternTeams, ...remainingTeams];
}

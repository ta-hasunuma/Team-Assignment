import type { Member, Team, TeamConfig } from '@/types';
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

  // TODO: 実装予定
  // 1. ルール適用（制約チーム作成）
  // 2. 残りメンバーでランダム分割

  return [];
}

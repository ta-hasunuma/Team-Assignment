import type { Member } from '@/types';

/**
 * NAiSメンバーの初期データ
 */
const NAIS_MEMBERS: Omit<Member, 'id'>[] = [
  { name: '山本', group: 'NAiS' },
  { name: '石澤', group: 'NAiS' },
  { name: '石井', group: 'NAiS' },
  { name: '中西', group: 'NAiS' },
  { name: '小久保', group: 'NAiS' },
];

/**
 * KAGメンバーの初期データ
 */
const KAG_MEMBERS: Omit<Member, 'id'>[] = [
  { name: '岡本', group: 'KAG' },
  { name: '高崎', group: 'KAG' },
  { name: '山中', group: 'KAG' },
  { name: '井黒', group: 'KAG' },
  { name: '蓮沼', group: 'KAG' },
];

/**
 * 初期メンバーリスト（IDを付与）
 */
export const INITIAL_MEMBERS: Member[] = [
  ...NAIS_MEMBERS.map((member, index) => ({
    ...member,
    id: `nais-${index + 1}`,
  })),
  ...KAG_MEMBERS.map((member, index) => ({
    ...member,
    id: `kag-${index + 1}`,
  })),
];

/**
 * デフォルトのチーム数
 */
export const DEFAULT_TEAM_COUNT = 4;

/**
 * チーム名のプレフィックス
 */
export const TEAM_NAME_PREFIX = 'WIP';

/**
 * チームの構成タイプ
 */
export type TeamType = 'NAiS_ONLY' | 'KAG_ONLY' | 'MIXED';

/**
 * パターン制約ルール
 */
export interface PatternRule {
  /** ルールID */
  id: string;
  /** チーム構成タイプ */
  type: TeamType;
  /** このルールで作成するチーム数 */
  teamCount: number;
  /** 1チームあたりのメンバー数 */
  membersPerTeam: number;
}

/**
 * チーム分け設定
 */
export interface TeamConfig {
  /** 作成するチームの総数 */
  totalTeams: number;
  /** パターン制約ルールのリスト */
  rules: PatternRule[];
}

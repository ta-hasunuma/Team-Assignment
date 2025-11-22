/**
 * メンバーの所属グループ
 */
export type MemberGroup = 'NAiS' | 'KAG';

/**
 * メンバー情報
 */
export interface Member {
  /** 一意のID */
  id: string;
  /** メンバー名 */
  name: string;
  /** 所属グループ */
  group: MemberGroup;
}

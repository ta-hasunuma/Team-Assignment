import type { Member } from './member';
import type { TeamType } from './config';

/**
 * チーム情報
 */
export interface Team {
  /** チームID */
  id: string;
  /** チーム名（例: WIP 1） */
  name: string;
  /** チームに所属するメンバーリスト */
  members: Member[];
  /** チームの構成タイプ（オプション） */
  type?: TeamType;
}

/**
 * バリデーションエラー情報
 */
export interface ValidationError {
  /** エラーが発生したフィールド */
  field: string;
  /** エラーメッセージ */
  message: string;
}

/**
 * バリデーション結果
 */
export interface ValidationResult {
  /** バリデーションが成功したかどうか */
  isValid: boolean;
  /** エラーリスト */
  errors: ValidationError[];
}

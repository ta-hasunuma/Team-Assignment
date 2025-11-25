import type {
  Member,
  TeamConfig,
  ValidationResult,
  ValidationError,
} from '@/types';

/**
 * チーム分け設定のバリデーション
 * @param members - 全メンバーリスト
 * @param config - チーム分け設定
 * @returns バリデーション結果
 */
export function validateConfig(
  members: Member[],
  config: TeamConfig
): ValidationResult {
  const errors: ValidationError[] = [];

  // メンバー数チェック
  if (members.length === 0) {
    errors.push({
      field: 'members',
      message: 'メンバーが登録されていません',
    });
    // メンバーが0人の場合、他のチェックは意味がないので早期リターン
    return {
      isValid: false,
      errors,
    };
  }

  // チーム数チェック
  if (config.totalTeams > members.length) {
    errors.push({
      field: 'totalTeams',
      message: `チーム数がメンバー数を超えています（必要: ${config.totalTeams}, 現在: ${members.length}）`,
    });
  }

  // ルール整合性チェック
  const naisCount = members.filter((m) => m.group === 'NAiS').length;
  const kagCount = members.filter((m) => m.group === 'KAG').length;

  for (const rule of config.rules) {
    const requiredMembers = rule.teamCount * rule.membersPerTeam;

    if (rule.type === 'NAiS_ONLY' && requiredMembers > naisCount) {
      errors.push({
        field: 'rules',
        message: `NAiSメンバーが足りません（必要: ${requiredMembers}, 現在: ${naisCount}）`,
      });
    }

    if (rule.type === 'KAG_ONLY' && requiredMembers > kagCount) {
      errors.push({
        field: 'rules',
        message: `KAGメンバーが足りません（必要: ${requiredMembers}, 現在: ${kagCount}）`,
      });
    }

    if (rule.type === 'MIXED') {
      // 混合チームの場合、各チームに両グループから最低1名ずつ必要
      const teamsInRule = rule.teamCount;

      if (teamsInRule > naisCount) {
        errors.push({
          field: 'rules',
          message: `混合チーム用のNAiSメンバーが足りません（必要: 最低${teamsInRule}名、現在: ${naisCount}名）`,
        });
      }

      if (teamsInRule > kagCount) {
        errors.push({
          field: 'rules',
          message: `混合チーム用のKAGメンバーが足りません（必要: 最低${teamsInRule}名、現在: ${kagCount}名）`,
        });
      }

      // 全体のメンバー数チェック
      const totalAvailable = naisCount + kagCount;
      if (requiredMembers > totalAvailable) {
        errors.push({
          field: 'rules',
          message: `混合チーム用のメンバーが足りません（必要: ${requiredMembers}名、現在: ${totalAvailable}名）`,
        });
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

import { useMemo } from 'react';
import type { Member, TeamConfig } from '@/types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * チーム分けのバリデーションを行うカスタムフック
 */
export function useValidation(
  members: Member[],
  config: TeamConfig
): ValidationResult {
  return useMemo(() => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // メンバー数0のチェック
    if (members.length === 0) {
      errors.push('メンバーが登録されていません');
      return { isValid: false, errors, warnings };
    }

    // チーム数の妥当性チェック
    if (config.totalTeams <= 0) {
      errors.push('チーム数は1以上で指定してください');
    }

    if (config.totalTeams > members.length) {
      errors.push(
        `チーム数(${config.totalTeams})がメンバー数(${members.length})を超えています`
      );
    }

    // グループ別メンバー数の集計
    const naisMembers = members.filter((m) => m.group === 'NAiS');
    const kagMembers = members.filter((m) => m.group === 'KAG');

    // パターンルールの検証
    let requiredNaisMembers = 0;
    let requiredKagMembers = 0;
    let requiredTeamsFromRules = 0;

    config.rules.forEach((rule) => {
      const totalMembersForRule = rule.teamCount * rule.membersPerTeam;
      requiredTeamsFromRules += rule.teamCount;

      if (rule.type === 'NAiS_ONLY') {
        requiredNaisMembers += totalMembersForRule;
      } else if (rule.type === 'KAG_ONLY') {
        requiredKagMembers += totalMembersForRule;
      } else if (rule.type === 'MIXED') {
        // MIXEDの場合、両グループから最低1名ずつ必要
        // 各チームにNAiSとKAGが少なくとも1名ずつ必要
        const teamsInRule = rule.teamCount;
        requiredNaisMembers += teamsInRule; // 各チームに最低1名のNAiS
        requiredKagMembers += teamsInRule; // 各チームに最低1名のKAG

        // 残りのメンバー数は両グループ合計で確保できればOK
        const remainingMembers = totalMembersForRule - teamsInRule * 2;
        if (remainingMembers > 0) {
          // 両グループ合計で残りのメンバーが確保できるかチェック
          const totalAvailableMembers = naisMembers.length + kagMembers.length;
          if (totalAvailableMembers < totalMembersForRule) {
            errors.push(
              `混合チーム用のメンバーが不足しています（必要: ${totalMembersForRule}名、現在: ${totalAvailableMembers}名）`
            );
          }
        }
      }
    });

    // NAiSメンバー不足チェック
    if (requiredNaisMembers > naisMembers.length) {
      errors.push(
        `NAiSメンバーが不足しています（必要: ${requiredNaisMembers}名、現在: ${naisMembers.length}名）`
      );
    }

    // KAGメンバー不足チェック
    if (requiredKagMembers > kagMembers.length) {
      errors.push(
        `KAGメンバーが不足しています（必要: ${requiredKagMembers}名、現在: ${kagMembers.length}名）`
      );
    }

    // パターンルールで使用されるチーム数チェック
    if (requiredTeamsFromRules > config.totalTeams) {
      errors.push(
        `パターン制約のチーム数合計(${requiredTeamsFromRules})が全体のWIP数(${config.totalTeams})を超えています`
      );
    }

    // 警告: チーム数が多すぎる場合
    if (config.totalTeams > members.length / 2) {
      warnings.push(
        'チーム数が多すぎます。1チームあたりのメンバー数が少なくなります'
      );
    }

    // 警告: パターンルールを使用している場合
    if (config.rules.length > 0 && requiredTeamsFromRules < config.totalTeams) {
      const remainingTeams = config.totalTeams - requiredTeamsFromRules;
      warnings.push(
        `${remainingTeams}チームは制約なしでランダムに作成されます`
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }, [members, config]);
}

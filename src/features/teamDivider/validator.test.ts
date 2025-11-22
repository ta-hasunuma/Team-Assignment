import { describe, it, expect } from 'vitest';
import { validateConfig } from './validator';
import type { Member, TeamConfig } from '@/types';

describe('validateConfig', () => {
  const createMockMembers = (naisCount: number, kagCount: number): Member[] => {
    const members: Member[] = [];

    for (let i = 0; i < naisCount; i++) {
      members.push({
        id: `nais-${i + 1}`,
        name: `NAiSメンバー${i + 1}`,
        group: 'NAiS',
      });
    }

    for (let i = 0; i < kagCount; i++) {
      members.push({
        id: `kag-${i + 1}`,
        name: `KAGメンバー${i + 1}`,
        group: 'KAG',
      });
    }

    return members;
  };

  describe('メンバー数チェック', () => {
    it('メンバーが0人の場合はエラー', () => {
      const members: Member[] = [];
      const config: TeamConfig = {
        totalTeams: 2,
        rules: [],
      };

      const result = validateConfig(members, config);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe('members');
      expect(result.errors[0].message).toContain(
        'メンバーが登録されていません'
      );
    });

    it('メンバーが存在する場合は正常', () => {
      const members = createMockMembers(5, 5);
      const config: TeamConfig = {
        totalTeams: 2,
        rules: [],
      };

      const result = validateConfig(members, config);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('チーム数チェック', () => {
    it('チーム数がメンバー数を超える場合はエラー', () => {
      const members = createMockMembers(5, 5); // 10名
      const config: TeamConfig = {
        totalTeams: 15, // 15チーム
        rules: [],
      };

      const result = validateConfig(members, config);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].field).toBe('totalTeams');
      expect(result.errors[0].message).toContain(
        'チーム数がメンバー数を超えています'
      );
      expect(result.errors[0].message).toContain('必要: 15');
      expect(result.errors[0].message).toContain('現在: 10');
    });

    it('チーム数がメンバー数以下の場合は正常', () => {
      const members = createMockMembers(5, 5); // 10名
      const config: TeamConfig = {
        totalTeams: 5, // 5チーム
        rules: [],
      };

      const result = validateConfig(members, config);

      expect(result.isValid).toBe(true);
    });
  });

  describe('ルール整合性チェック - NAiSのみ', () => {
    it('NAiSメンバーが不足している場合はエラー', () => {
      const members = createMockMembers(3, 5); // NAiS: 3名, KAG: 5名
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [
          {
            id: 'rule-1',
            type: 'NAiS_ONLY',
            teamCount: 2, // 2チーム
            membersPerTeam: 3, // 1チーム3名 = 必要6名
          },
        ],
      };

      const result = validateConfig(members, config);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].field).toBe('rules');
      expect(result.errors[0].message).toContain('NAiSメンバーが足りません');
      expect(result.errors[0].message).toContain('必要: 6');
      expect(result.errors[0].message).toContain('現在: 3');
    });

    it('NAiSメンバーが十分な場合は正常', () => {
      const members = createMockMembers(6, 5); // NAiS: 6名, KAG: 5名
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [
          {
            id: 'rule-1',
            type: 'NAiS_ONLY',
            teamCount: 2,
            membersPerTeam: 3, // 必要6名
          },
        ],
      };

      const result = validateConfig(members, config);

      expect(result.isValid).toBe(true);
    });
  });

  describe('ルール整合性チェック - KAGのみ', () => {
    it('KAGメンバーが不足している場合はエラー', () => {
      const members = createMockMembers(5, 2); // NAiS: 5名, KAG: 2名
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [
          {
            id: 'rule-1',
            type: 'KAG_ONLY',
            teamCount: 1,
            membersPerTeam: 4, // 必要4名
          },
        ],
      };

      const result = validateConfig(members, config);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].field).toBe('rules');
      expect(result.errors[0].message).toContain('KAGメンバーが足りません');
      expect(result.errors[0].message).toContain('必要: 4');
      expect(result.errors[0].message).toContain('現在: 2');
    });

    it('KAGメンバーが十分な場合は正常', () => {
      const members = createMockMembers(5, 4); // NAiS: 5名, KAG: 4名
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [
          {
            id: 'rule-1',
            type: 'KAG_ONLY',
            teamCount: 1,
            membersPerTeam: 4, // 必要4名
          },
        ],
      };

      const result = validateConfig(members, config);

      expect(result.isValid).toBe(true);
    });
  });

  describe('複数ルールのチェック', () => {
    it('複数のルールがある場合、すべてのエラーを返す', () => {
      const members = createMockMembers(2, 2); // NAiS: 2名, KAG: 2名
      const config: TeamConfig = {
        totalTeams: 4,
        rules: [
          {
            id: 'rule-1',
            type: 'NAiS_ONLY',
            teamCount: 1,
            membersPerTeam: 3, // NAiS: 必要3名
          },
          {
            id: 'rule-2',
            type: 'KAG_ONLY',
            teamCount: 1,
            membersPerTeam: 3, // KAG: 必要3名
          },
        ],
      };

      const result = validateConfig(members, config);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors[0].message).toContain('NAiSメンバーが足りません');
      expect(result.errors[1].message).toContain('KAGメンバーが足りません');
    });
  });

  describe('混合タイプのルール', () => {
    it('MIXEDタイプのルールはメンバー数チェックをスキップ', () => {
      const members = createMockMembers(5, 5);
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [
          {
            id: 'rule-1',
            type: 'MIXED',
            teamCount: 2,
            membersPerTeam: 3,
          },
        ],
      };

      const result = validateConfig(members, config);

      expect(result.isValid).toBe(true);
    });
  });
});

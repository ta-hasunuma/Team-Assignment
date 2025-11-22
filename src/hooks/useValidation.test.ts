import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useValidation } from './useValidation';
import type { Member, TeamConfig } from '@/types';

describe('useValidation', () => {
  const createMember = (
    id: string,
    name: string,
    group: 'NAiS' | 'KAG'
  ): Member => ({
    id,
    name,
    group,
  });

  describe('メンバー数0のチェック', () => {
    it('メンバーが0人の場合、エラーを返す', () => {
      const config: TeamConfig = { totalTeams: 2, rules: [] };
      const { result } = renderHook(() => useValidation([], config));

      expect(result.current.isValid).toBe(false);
      expect(result.current.errors).toContain('メンバーが登録されていません');
    });
  });

  describe('チーム数の妥当性チェック', () => {
    it('チーム数が0以下の場合、エラーを返す', () => {
      const members = [createMember('1', 'Alice', 'NAiS')];
      const config: TeamConfig = { totalTeams: 0, rules: [] };
      const { result } = renderHook(() => useValidation(members, config));

      expect(result.current.isValid).toBe(false);
      expect(result.current.errors).toContain(
        'チーム数は1以上で指定してください'
      );
    });

    it('チーム数がメンバー数を超える場合、エラーを返す', () => {
      const members = [
        createMember('1', 'Alice', 'NAiS'),
        createMember('2', 'Bob', 'NAiS'),
      ];
      const config: TeamConfig = { totalTeams: 5, rules: [] };
      const { result } = renderHook(() => useValidation(members, config));

      expect(result.current.isValid).toBe(false);
      expect(result.current.errors).toContain(
        'チーム数(5)がメンバー数(2)を超えています'
      );
    });
  });

  describe('NAiSメンバー不足のチェック', () => {
    it('NAiSのみのチームに必要なメンバーが不足している場合、エラーを返す', () => {
      const members = [
        createMember('1', 'Alice', 'NAiS'),
        createMember('2', 'Bob', 'NAiS'),
        createMember('3', 'Charlie', 'KAG'),
      ];
      const config: TeamConfig = {
        totalTeams: 2,
        rules: [
          {
            id: 'rule1',
            type: 'NAiS_ONLY',
            teamCount: 1,
            membersPerTeam: 3,
          },
        ],
      };
      const { result } = renderHook(() => useValidation(members, config));

      expect(result.current.isValid).toBe(false);
      expect(result.current.errors).toContain(
        'NAiSメンバーが不足しています（必要: 3名、現在: 2名）'
      );
    });
  });

  describe('KAGメンバー不足のチェック', () => {
    it('KAGのみのチームに必要なメンバーが不足している場合、エラーを返す', () => {
      const members = [
        createMember('1', 'Alice', 'NAiS'),
        createMember('2', 'Bob', 'KAG'),
      ];
      const config: TeamConfig = {
        totalTeams: 2,
        rules: [
          {
            id: 'rule1',
            type: 'KAG_ONLY',
            teamCount: 1,
            membersPerTeam: 3,
          },
        ],
      };
      const { result } = renderHook(() => useValidation(members, config));

      expect(result.current.isValid).toBe(false);
      expect(result.current.errors).toContain(
        'KAGメンバーが不足しています（必要: 3名、現在: 1名）'
      );
    });
  });

  describe('パターンルールのチーム数チェック', () => {
    it('パターン制約のチーム数合計が全体のWIP数を超える場合、エラーを返す', () => {
      const members = Array.from({ length: 10 }, (_, i) =>
        createMember(`${i}`, `Member${i}`, 'NAiS')
      );
      const config: TeamConfig = {
        totalTeams: 2,
        rules: [
          {
            id: 'rule1',
            type: 'NAiS_ONLY',
            teamCount: 2,
            membersPerTeam: 3,
          },
          {
            id: 'rule2',
            type: 'MIXED',
            teamCount: 2,
            membersPerTeam: 2,
          },
        ],
      };
      const { result } = renderHook(() => useValidation(members, config));

      expect(result.current.isValid).toBe(false);
      expect(result.current.errors).toContain(
        'パターン制約のチーム数合計(4)が全体のWIP数(2)を超えています'
      );
    });
  });

  describe('警告メッセージ', () => {
    it('チーム数が多すぎる場合、警告を返す', () => {
      const members = Array.from({ length: 4 }, (_, i) =>
        createMember(`${i}`, `Member${i}`, 'NAiS')
      );
      const config: TeamConfig = { totalTeams: 3, rules: [] };
      const { result } = renderHook(() => useValidation(members, config));

      expect(result.current.isValid).toBe(true);
      expect(result.current.warnings).toContain(
        'チーム数が多すぎます。1チームあたりのメンバー数が少なくなります'
      );
    });

    it('パターンルールを使用していて残りチームがある場合、警告を返す', () => {
      const members = Array.from({ length: 10 }, (_, i) =>
        createMember(`${i}`, `Member${i}`, 'NAiS')
      );
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [
          {
            id: 'rule1',
            type: 'NAiS_ONLY',
            teamCount: 1,
            membersPerTeam: 3,
          },
        ],
      };
      const { result } = renderHook(() => useValidation(members, config));

      expect(result.current.isValid).toBe(true);
      expect(result.current.warnings).toContain(
        '2チームは制約なしでランダムに作成されます'
      );
    });
  });

  describe('正常ケース', () => {
    it('すべてのバリデーションが成功する場合、isValidがtrueを返す', () => {
      const members = Array.from({ length: 10 }, (_, i) =>
        createMember(`${i}`, `Member${i}`, i % 2 === 0 ? 'NAiS' : 'KAG')
      );
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [
          {
            id: 'rule1',
            type: 'NAiS_ONLY',
            teamCount: 1,
            membersPerTeam: 3,
          },
        ],
      };
      const { result } = renderHook(() => useValidation(members, config));

      expect(result.current.isValid).toBe(true);
      expect(result.current.errors).toHaveLength(0);
    });
  });
});

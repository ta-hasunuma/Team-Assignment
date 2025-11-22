import { describe, it, expect } from 'vitest';
import { shuffleArray, divideTeams } from './teamDivider';
import type { Member, TeamConfig } from '@/types';

describe('shuffleArray', () => {
  it('配列の長さが変わらない', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);

    expect(shuffled).toHaveLength(original.length);
  });

  it('元の配列を変更しない（イミュータブル）', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];

    shuffleArray(original);

    expect(original).toEqual(copy);
  });

  it('すべての要素が保持される', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);

    for (const item of original) {
      expect(shuffled).toContain(item);
    }
  });

  it('空配列をシャッフルしても空配列', () => {
    const original: number[] = [];
    const shuffled = shuffleArray(original);

    expect(shuffled).toEqual([]);
  });

  it('1要素の配列はそのまま', () => {
    const original = [42];
    const shuffled = shuffleArray(original);

    expect(shuffled).toEqual([42]);
  });

  it('文字列配列でも動作する', () => {
    const original = ['a', 'b', 'c', 'd'];
    const shuffled = shuffleArray(original);

    expect(shuffled).toHaveLength(4);
    expect(shuffled).toContain('a');
    expect(shuffled).toContain('b');
    expect(shuffled).toContain('c');
    expect(shuffled).toContain('d');
  });

  it('オブジェクト配列でも動作する', () => {
    const original = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const shuffled = shuffleArray(original);

    expect(shuffled).toHaveLength(3);
    expect(shuffled).toContainEqual({ id: 1, name: 'Alice' });
    expect(shuffled).toContainEqual({ id: 2, name: 'Bob' });
    expect(shuffled).toContainEqual({ id: 3, name: 'Charlie' });
  });

  describe('ランダム性の検証', () => {
    it('複数回実行すると異なる結果になる（確率的テスト）', () => {
      const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const results = new Set<string>();

      // 10回シャッフルして結果を記録
      for (let i = 0; i < 10; i++) {
        const shuffled = shuffleArray(original);
        results.add(JSON.stringify(shuffled));
      }

      // 10回中、少なくとも2つは異なる結果になるはず
      // （完全に同じになる確率は極めて低い）
      expect(results.size).toBeGreaterThan(1);
    });
  });
});

describe('divideTeams', () => {
  const createMockMembers = (naisCount: number, kagCount: number): Member[] => {
    const members: Member[] = [];

    for (let i = 0; i < naisCount; i++) {
      members.push({
        id: `nais-${i + 1}`,
        name: `NAiS${i + 1}`,
        group: 'NAiS',
      });
    }

    for (let i = 0; i < kagCount; i++) {
      members.push({
        id: `kag-${i + 1}`,
        name: `KAG${i + 1}`,
        group: 'KAG',
      });
    }

    return members;
  };

  describe('基本的なチーム分け', () => {
    it('10名を2チームに分割できる', () => {
      const members = createMockMembers(5, 5);
      const config: TeamConfig = {
        totalTeams: 2,
        rules: [],
      };

      const teams = divideTeams(members, config);

      expect(teams).toHaveLength(2);

      const totalMembers = teams.reduce(
        (sum, team) => sum + team.members.length,
        0
      );
      expect(totalMembers).toBe(10);
    });

    it('10名を3チームに分割できる（端数処理）', () => {
      const members = createMockMembers(5, 5);
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [],
      };

      const teams = divideTeams(members, config);

      expect(teams).toHaveLength(3);

      const totalMembers = teams.reduce(
        (sum, team) => sum + team.members.length,
        0
      );
      expect(totalMembers).toBe(10);

      // チームサイズは3または4名のはず
      teams.forEach((team) => {
        expect(team.members.length).toBeGreaterThanOrEqual(3);
        expect(team.members.length).toBeLessThanOrEqual(4);
      });
    });

    it('すべてのメンバーがいずれかのチームに所属する', () => {
      const members = createMockMembers(5, 5);
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [],
      };

      const teams = divideTeams(members, config);
      const assignedMemberIds = teams.flatMap((team) =>
        team.members.map((m) => m.id)
      );

      members.forEach((member) => {
        expect(assignedMemberIds).toContain(member.id);
      });
    });

    it('チーム名が正しく設定される', () => {
      const members = createMockMembers(6, 6);
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [],
      };

      const teams = divideTeams(members, config);

      expect(teams[0].name).toBe('WIP 1');
      expect(teams[1].name).toBe('WIP 2');
      expect(teams[2].name).toBe('WIP 3');
    });
  });

  describe('パターン制約適用', () => {
    it('NAiSのみチームを作成できる', () => {
      const members = createMockMembers(6, 6);
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [
          {
            id: 'rule-1',
            type: 'NAiS_ONLY',
            teamCount: 1,
            membersPerTeam: 3,
          },
        ],
      };

      const teams = divideTeams(members, config);

      expect(teams).toHaveLength(3);

      // 最初のチームはNAiSのみ
      const firstTeam = teams[0];
      expect(firstTeam.type).toBe('NAiS_ONLY');
      expect(firstTeam.members).toHaveLength(3);
      firstTeam.members.forEach((member) => {
        expect(member.group).toBe('NAiS');
      });
    });

    it('KAGのみチームを作成できる', () => {
      const members = createMockMembers(6, 6);
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [
          {
            id: 'rule-1',
            type: 'KAG_ONLY',
            teamCount: 1,
            membersPerTeam: 4,
          },
        ],
      };

      const teams = divideTeams(members, config);

      expect(teams).toHaveLength(3);

      // 最初のチームはKAGのみ
      const firstTeam = teams[0];
      expect(firstTeam.type).toBe('KAG_ONLY');
      expect(firstTeam.members).toHaveLength(4);
      firstTeam.members.forEach((member) => {
        expect(member.group).toBe('KAG');
      });
    });

    it('複数のパターン制約を適用できる', () => {
      const members = createMockMembers(6, 6);
      const config: TeamConfig = {
        totalTeams: 4,
        rules: [
          {
            id: 'rule-1',
            type: 'NAiS_ONLY',
            teamCount: 1,
            membersPerTeam: 3,
          },
          {
            id: 'rule-2',
            type: 'KAG_ONLY',
            teamCount: 1,
            membersPerTeam: 3,
          },
        ],
      };

      const teams = divideTeams(members, config);

      expect(teams).toHaveLength(4);

      // 最初の2チームは制約適用済み
      expect(teams[0].type).toBe('NAiS_ONLY');
      expect(teams[1].type).toBe('KAG_ONLY');

      // 残りの2チームは混合
      expect(teams[2].type).toBeUndefined();
      expect(teams[3].type).toBeUndefined();
    });
  });

  describe('エラーハンドリング', () => {
    it('バリデーションエラー時は例外を投げる', () => {
      const members: Member[] = [];
      const config: TeamConfig = {
        totalTeams: 2,
        rules: [],
      };

      expect(() => divideTeams(members, config)).toThrow(
        'メンバーが登録されていません'
      );
    });

    it('メンバー不足時は例外を投げる', () => {
      const members = createMockMembers(2, 2);
      const config: TeamConfig = {
        totalTeams: 3,
        rules: [
          {
            id: 'rule-1',
            type: 'NAiS_ONLY',
            teamCount: 1,
            membersPerTeam: 5,
          },
        ],
      };

      expect(() => divideTeams(members, config)).toThrow(
        'NAiSメンバーが足りません'
      );
    });
  });
});

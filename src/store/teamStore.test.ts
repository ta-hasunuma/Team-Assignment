import { describe, it, expect, beforeEach } from 'vitest';
import { useTeamStore } from './teamStore';
import { INITIAL_MEMBERS, DEFAULT_TEAM_COUNT } from '@/constants/initialData';
import type { Member, PatternRule } from '@/types';

describe('useTeamStore', () => {
  beforeEach(() => {
    // 各テストの前にストアをリセット
    const store = useTeamStore.getState();
    store.resetMembers();
    store.updateConfig({ totalTeams: DEFAULT_TEAM_COUNT, rules: [] });
    store.clearTeams();
  });

  describe('初期状態', () => {
    it('初期メンバーが設定されている', () => {
      const { members } = useTeamStore.getState();
      expect(members).toEqual(INITIAL_MEMBERS);
      expect(members).toHaveLength(10);
    });

    it('デフォルト設定が適用されている', () => {
      const { config } = useTeamStore.getState();
      expect(config.totalTeams).toBe(DEFAULT_TEAM_COUNT);
      expect(config.rules).toEqual([]);
    });

    it('チームリストが空である', () => {
      const { teams } = useTeamStore.getState();
      expect(teams).toEqual([]);
    });

    it('ローディング状態がfalseである', () => {
      const { isLoading } = useTeamStore.getState();
      expect(isLoading).toBe(false);
    });

    it('エラーがnullである', () => {
      const { error } = useTeamStore.getState();
      expect(error).toBeNull();
    });
  });

  describe('メンバー操作', () => {
    describe('addMember', () => {
      it('新しいメンバーを追加できる', () => {
        const store = useTeamStore.getState();
        const newMember: Member = {
          id: 'new-1',
          name: 'New Member',
          group: 'NAiS',
        };

        store.addMember(newMember);

        const { members } = useTeamStore.getState();
        expect(members).toHaveLength(11);
        expect(members[members.length - 1]).toEqual(newMember);
      });

      it('複数のメンバーを連続して追加できる', () => {
        const store = useTeamStore.getState();
        const member1: Member = {
          id: 'new-1',
          name: 'Member 1',
          group: 'NAiS',
        };
        const member2: Member = { id: 'new-2', name: 'Member 2', group: 'KAG' };

        store.addMember(member1);
        store.addMember(member2);

        const { members } = useTeamStore.getState();
        expect(members).toHaveLength(12);
      });
    });

    describe('removeMember', () => {
      it('指定したIDのメンバーを削除できる', () => {
        const store = useTeamStore.getState();
        const firstMemberId = INITIAL_MEMBERS[0].id;

        store.removeMember(firstMemberId);

        const { members } = useTeamStore.getState();
        expect(members).toHaveLength(9);
        expect(members.find((m) => m.id === firstMemberId)).toBeUndefined();
      });

      it('存在しないIDを指定しても他のメンバーに影響しない', () => {
        const store = useTeamStore.getState();
        const beforeCount = useTeamStore.getState().members.length;

        store.removeMember('non-existent-id');

        const { members } = useTeamStore.getState();
        expect(members).toHaveLength(beforeCount);
      });
    });

    describe('updateMember', () => {
      it('メンバーの名前を更新できる', () => {
        const store = useTeamStore.getState();
        const targetId = INITIAL_MEMBERS[0].id;

        store.updateMember(targetId, { name: 'Updated Name' });

        const { members } = useTeamStore.getState();
        const updatedMember = members.find((m) => m.id === targetId);
        expect(updatedMember?.name).toBe('Updated Name');
      });

      it('メンバーのグループを更新できる', () => {
        const store = useTeamStore.getState();
        const targetId = INITIAL_MEMBERS[0].id;

        store.updateMember(targetId, { group: 'KAG' });

        const { members } = useTeamStore.getState();
        const updatedMember = members.find((m) => m.id === targetId);
        expect(updatedMember?.group).toBe('KAG');
      });

      it('存在しないIDを指定しても他のメンバーに影響しない', () => {
        const store = useTeamStore.getState();
        const beforeMembers = useTeamStore.getState().members;

        store.updateMember('non-existent-id', { name: 'New Name' });

        const { members } = useTeamStore.getState();
        expect(members).toEqual(beforeMembers);
      });
    });

    describe('resetMembers', () => {
      it('メンバーを初期状態にリセットできる', () => {
        const store = useTeamStore.getState();

        // メンバーを追加・削除
        store.addMember({ id: 'temp', name: 'Temp', group: 'NAiS' });
        store.removeMember(INITIAL_MEMBERS[0].id);

        // リセット
        store.resetMembers();

        const { members } = useTeamStore.getState();
        expect(members).toEqual(INITIAL_MEMBERS);
      });
    });
  });

  describe('設定操作', () => {
    describe('updateConfig', () => {
      it('チーム数を更新できる', () => {
        const store = useTeamStore.getState();

        store.updateConfig({ totalTeams: 5 });

        const { config } = useTeamStore.getState();
        expect(config.totalTeams).toBe(5);
      });

      it('部分的な更新が可能', () => {
        const store = useTeamStore.getState();
        const rule: PatternRule = {
          id: 'rule-1',
          type: 'NAiS_ONLY',
          teamCount: 1,
          membersPerTeam: 3,
        };

        store.addPatternRule(rule);
        store.updateConfig({ totalTeams: 4 });

        const { config } = useTeamStore.getState();
        expect(config.totalTeams).toBe(4);
        expect(config.rules).toHaveLength(1);
      });
    });

    describe('addPatternRule', () => {
      it('パターンルールを追加できる', () => {
        const store = useTeamStore.getState();
        const rule: PatternRule = {
          id: 'rule-1',
          type: 'NAiS_ONLY',
          teamCount: 1,
          membersPerTeam: 3,
        };

        store.addPatternRule(rule);

        const { config } = useTeamStore.getState();
        expect(config.rules).toHaveLength(1);
        expect(config.rules[0]).toEqual(rule);
      });

      it('複数のルールを追加できる', () => {
        const store = useTeamStore.getState();
        const rule1: PatternRule = {
          id: 'rule-1',
          type: 'NAiS_ONLY',
          teamCount: 1,
          membersPerTeam: 3,
        };
        const rule2: PatternRule = {
          id: 'rule-2',
          type: 'KAG_ONLY',
          teamCount: 1,
          membersPerTeam: 3,
        };

        store.addPatternRule(rule1);
        store.addPatternRule(rule2);

        const { config } = useTeamStore.getState();
        expect(config.rules).toHaveLength(2);
      });
    });

    describe('removePatternRule', () => {
      it('指定したIDのルールを削除できる', () => {
        const store = useTeamStore.getState();
        const rule: PatternRule = {
          id: 'rule-1',
          type: 'NAiS_ONLY',
          teamCount: 1,
          membersPerTeam: 3,
        };

        store.addPatternRule(rule);
        store.removePatternRule('rule-1');

        const { config } = useTeamStore.getState();
        expect(config.rules).toHaveLength(0);
      });

      it('存在しないIDを指定しても他のルールに影響しない', () => {
        const store = useTeamStore.getState();
        const rule: PatternRule = {
          id: 'rule-1',
          type: 'NAiS_ONLY',
          teamCount: 1,
          membersPerTeam: 3,
        };

        store.addPatternRule(rule);
        store.removePatternRule('non-existent-id');

        const { config } = useTeamStore.getState();
        expect(config.rules).toHaveLength(1);
      });
    });
  });

  describe('チーム作成操作', () => {
    describe('createTeams', () => {
      it('チームを作成できる', () => {
        const store = useTeamStore.getState();

        store.createTeams();

        const { teams } = useTeamStore.getState();
        expect(teams).toHaveLength(DEFAULT_TEAM_COUNT);
      });

      it('作成されたチームにすべてのメンバーが含まれる', () => {
        const store = useTeamStore.getState();

        store.createTeams();

        const { teams, members } = useTeamStore.getState();
        const totalAssignedMembers = teams.reduce(
          (sum, team) => sum + team.members.length,
          0
        );
        expect(totalAssignedMembers).toBe(members.length);
      });

      it('エラー発生時にエラーメッセージを設定する', () => {
        const store = useTeamStore.getState();

        // 無効な設定（メンバー0人）
        store.resetMembers();
        store.updateConfig({ totalTeams: 3, rules: [] });

        // 全メンバーを削除
        const members = useTeamStore.getState().members;
        members.forEach((member) => {
          store.removeMember(member.id);
        });

        store.createTeams();

        const { error, isLoading } = useTeamStore.getState();
        expect(error).not.toBeNull();
        expect(isLoading).toBe(false);
      });

      it('成功時にエラーをクリアする', () => {
        const store = useTeamStore.getState();

        // 最初にエラーを発生させる
        const members = useTeamStore.getState().members;
        members.forEach((member) => {
          store.removeMember(member.id);
        });
        store.createTeams();
        expect(useTeamStore.getState().error).not.toBeNull();

        // メンバーをリセットして再実行
        store.resetMembers();
        store.createTeams();

        const { error } = useTeamStore.getState();
        expect(error).toBeNull();
      });
    });

    describe('clearTeams', () => {
      it('作成したチームをクリアできる', () => {
        const store = useTeamStore.getState();

        store.createTeams();
        expect(useTeamStore.getState().teams).not.toHaveLength(0);

        store.clearTeams();

        const { teams } = useTeamStore.getState();
        expect(teams).toHaveLength(0);
      });

      it('エラーもクリアされる', () => {
        const store = useTeamStore.getState();

        // エラーを発生させる
        const members = useTeamStore.getState().members;
        members.forEach((member) => {
          store.removeMember(member.id);
        });
        store.createTeams();
        expect(useTeamStore.getState().error).not.toBeNull();

        store.clearTeams();

        const { error } = useTeamStore.getState();
        expect(error).toBeNull();
      });
    });
  });

  describe('統合シナリオ', () => {
    it('メンバー追加→設定変更→チーム作成の一連の流れ', () => {
      const store = useTeamStore.getState();

      // メンバー追加
      store.addMember({ id: 'new-1', name: 'New Member', group: 'NAiS' });

      // 設定変更
      store.updateConfig({ totalTeams: 4 });

      // チーム作成
      store.createTeams();

      const { teams, members } = useTeamStore.getState();
      expect(teams).toHaveLength(4);
      expect(members).toHaveLength(11);

      const totalAssigned = teams.reduce(
        (sum, team) => sum + team.members.length,
        0
      );
      expect(totalAssigned).toBe(11);
    });

    it('ルール追加→チーム作成→クリア→再作成', () => {
      const store = useTeamStore.getState();

      // ルール追加
      const rule: PatternRule = {
        id: 'rule-1',
        type: 'NAiS_ONLY',
        teamCount: 1,
        membersPerTeam: 3,
      };
      store.addPatternRule(rule);

      // チーム作成
      store.createTeams();
      expect(useTeamStore.getState().teams).toHaveLength(DEFAULT_TEAM_COUNT);

      // クリア
      store.clearTeams();
      expect(useTeamStore.getState().teams).toHaveLength(0);

      // 再作成
      store.createTeams();
      const { teams } = useTeamStore.getState();
      expect(teams).toHaveLength(DEFAULT_TEAM_COUNT);
      expect(teams[0].type).toBe('NAiS_ONLY');
    });
  });
});

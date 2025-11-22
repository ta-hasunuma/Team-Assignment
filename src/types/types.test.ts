import { describe, it, expect } from 'vitest';
import type { Member, MemberGroup, TeamConfig, Team } from '@/types';
import { INITIAL_MEMBERS, DEFAULT_TEAM_COUNT } from '@/constants/initialData';

describe('Type Definitions', () => {
  describe('Member types', () => {
    it('should define Member interface correctly', () => {
      const member: Member = {
        id: 'test-1',
        name: 'テスト太郎',
        group: 'NAiS',
      };

      expect(member.id).toBe('test-1');
      expect(member.name).toBe('テスト太郎');
      expect(member.group).toBe('NAiS');
    });

    it('should accept valid MemberGroup values', () => {
      const naisGroup: MemberGroup = 'NAiS';
      const kagGroup: MemberGroup = 'KAG';

      expect(naisGroup).toBe('NAiS');
      expect(kagGroup).toBe('KAG');
    });
  });

  describe('TeamConfig types', () => {
    it('should define TeamConfig interface correctly', () => {
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

      expect(config.totalTeams).toBe(3);
      expect(config.rules).toHaveLength(1);
      expect(config.rules[0].type).toBe('NAiS_ONLY');
    });
  });

  describe('Team types', () => {
    it('should define Team interface correctly', () => {
      const team: Team = {
        id: 'team-1',
        name: 'WIP 1',
        members: [],
        type: 'MIXED',
      };

      expect(team.id).toBe('team-1');
      expect(team.name).toBe('WIP 1');
      expect(team.members).toEqual([]);
      expect(team.type).toBe('MIXED');
    });
  });
});

describe('Initial Data', () => {
  describe('INITIAL_MEMBERS', () => {
    it('should have 10 members total', () => {
      expect(INITIAL_MEMBERS).toHaveLength(10);
    });

    it('should have 5 NAiS members', () => {
      const naisMembers = INITIAL_MEMBERS.filter((m) => m.group === 'NAiS');
      expect(naisMembers).toHaveLength(5);
    });

    it('should have 5 KAG members', () => {
      const kagMembers = INITIAL_MEMBERS.filter((m) => m.group === 'KAG');
      expect(kagMembers).toHaveLength(5);
    });

    it('should have correct NAiS member names', () => {
      const naisMembers = INITIAL_MEMBERS.filter((m) => m.group === 'NAiS');
      const naisNames = naisMembers.map((m) => m.name);

      expect(naisNames).toContain('山本');
      expect(naisNames).toContain('石澤');
      expect(naisNames).toContain('石井');
      expect(naisNames).toContain('中西');
      expect(naisNames).toContain('小久保');
    });

    it('should have correct KAG member names', () => {
      const kagMembers = INITIAL_MEMBERS.filter((m) => m.group === 'KAG');
      const kagNames = kagMembers.map((m) => m.name);

      expect(kagNames).toContain('岡本');
      expect(kagNames).toContain('高崎');
      expect(kagNames).toContain('山中');
      expect(kagNames).toContain('井黒');
      expect(kagNames).toContain('蓮沼');
    });

    it('should have unique IDs for all members', () => {
      const ids = INITIAL_MEMBERS.map((m) => m.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(INITIAL_MEMBERS.length);
    });

    it('should have proper ID format', () => {
      INITIAL_MEMBERS.forEach((member) => {
        if (member.group === 'NAiS') {
          expect(member.id).toMatch(/^nais-\d+$/);
        } else {
          expect(member.id).toMatch(/^kag-\d+$/);
        }
      });
    });
  });

  describe('DEFAULT_TEAM_COUNT', () => {
    it('should be 3', () => {
      expect(DEFAULT_TEAM_COUNT).toBe(3);
    });
  });
});

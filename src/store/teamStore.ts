import { create } from 'zustand';
import type { Member, TeamConfig, Team, PatternRule } from '@/types';
import { INITIAL_MEMBERS, DEFAULT_TEAM_COUNT } from '@/constants/initialData';
import { divideTeams } from '@/features/teamDivider/teamDivider';

/**
 * チーム分けアプリの状態管理ストア
 */
interface TeamStore {
  // State
  members: Member[];
  config: TeamConfig;
  teams: Team[];
  isLoading: boolean;
  error: string | null;

  // Member actions
  addMember: (member: Member) => void;
  removeMember: (memberId: string) => void;
  updateMember: (memberId: string, updates: Partial<Member>) => void;
  resetMembers: () => void;

  // Config actions
  updateConfig: (config: Partial<TeamConfig>) => void;
  addPatternRule: (rule: PatternRule) => void;
  removePatternRule: (ruleId: string) => void;

  // Team actions
  createTeams: () => void;
  clearTeams: () => void;
}

/**
 * チーム分けストアの初期状態
 */
const initialState = {
  members: INITIAL_MEMBERS,
  config: {
    totalTeams: DEFAULT_TEAM_COUNT,
    rules: [],
  },
  teams: [],
  isLoading: false,
  error: null,
};

export const useTeamStore = create<TeamStore>((set, get) => ({
  ...initialState,

  // Member actions
  addMember: (member) =>
    set((state) => ({
      members: [...state.members, member],
    })),

  removeMember: (memberId) =>
    set((state) => ({
      members: state.members.filter((m) => m.id !== memberId),
    })),

  updateMember: (memberId, updates) =>
    set((state) => ({
      members: state.members.map((m) =>
        m.id === memberId ? { ...m, ...updates } : m
      ),
    })),

  resetMembers: () =>
    set({
      members: INITIAL_MEMBERS,
    }),

  // Config actions
  updateConfig: (configUpdates) =>
    set((state) => ({
      config: { ...state.config, ...configUpdates },
    })),

  addPatternRule: (rule) =>
    set((state) => ({
      config: {
        ...state.config,
        rules: [...state.config.rules, rule],
      },
    })),

  removePatternRule: (ruleId) =>
    set((state) => ({
      config: {
        ...state.config,
        rules: state.config.rules.filter((r) => r.id !== ruleId),
      },
    })),

  // Team actions
  createTeams: () => {
    const { members, config } = get();

    set({ isLoading: true, error: null });

    try {
      const teams = divideTeams(members, config);
      set({ teams, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'チーム作成に失敗しました',
        isLoading: false,
      });
    }
  },

  clearTeams: () =>
    set({
      teams: [],
      error: null,
    }),
}));

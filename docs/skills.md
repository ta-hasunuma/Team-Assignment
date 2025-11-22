# 技術仕様書

## 1. 技術選定

### コアフレームワーク

| 技術           | バージョン | 選定理由                                              |
| -------------- | ---------- | ----------------------------------------------------- |
| **React**      | 18.3+      | 仕様書推奨、宣言的 UI、豊富なエコシステム、フック活用 |
| **TypeScript** | 5.0+       | 型安全性、テスト容易性、保守性向上、開発体験向上      |
| **Vite**       | 5.0+       | 高速ビルド、HMR、ESM ネイティブ、GitHub Pages 対応    |

### スタイリング

| 技術             | バージョン | 選定理由                                           |
| ---------------- | ---------- | -------------------------------------------------- |
| **Tailwind CSS** | 3.4+       | 仕様書推奨、ユーティリティファースト、高速開発     |
| **DaisyUI**      | 4.0+       | 仕様書推奨、一貫した UI コンポーネント、テーマ対応 |
| **Lucide React** | latest     | 軽量アイコンライブラリ、Tree-shaking 対応          |

### テストフレームワーク（TDD 重視）

| 技術                            | 選定理由                                                       |
| ------------------------------- | -------------------------------------------------------------- |
| **Vitest**                      | Vite ネイティブ、高速実行、Jest 互換 API、HMR 対応             |
| **Testing Library (React)**     | ユーザー視点のテスト、アクセシビリティ重視、ベストプラクティス |
| **@testing-library/user-event** | より現実的なユーザーインタラクションテスト                     |
| **MSW (Mock Service Worker)**   | API 層のモック（将来拡張用）                                   |

### 状態管理

| 技術                                 | 選定理由                                                             |
| ------------------------------------ | -------------------------------------------------------------------- |
| **Zustand**                          | 小規模アプリに最適、シンプル API、テスト容易性、ボイラープレート不要 |
| （代替案: Context API + useReducer） | 外部ライブラリ不要、React 標準                                       |

### 開発支援ツール

| 技術                           | 用途                           |
| ------------------------------ | ------------------------------ |
| **ESLint + TypeScript ESLint** | 静的解析、コード品質維持       |
| **Prettier**                   | コードフォーマット、一貫性確保 |
| **Husky + lint-staged**        | コミット前チェック、品質ゲート |

---

## 2. ディレクトリ構成

```
Team-Assignment/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages自動デプロイ
│
├── public/
│   └── vite.svg                    # ファビコン等
│
├── src/
│   ├── components/                 # Reactコンポーネント（Presentation層）
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.test.tsx
│   │   ├── MemberManagement/
│   │   │   ├── MemberList.tsx
│   │   │   ├── MemberList.test.tsx
│   │   │   ├── MemberInput.tsx
│   │   │   └── MemberInput.test.tsx
│   │   ├── TeamConfiguration/
│   │   │   ├── TeamConfig.tsx
│   │   │   ├── TeamConfig.test.tsx
│   │   │   ├── PatternRule.tsx
│   │   │   └── PatternRule.test.tsx
│   │   ├── ActionArea/
│   │   │   ├── ActionButtons.tsx
│   │   │   └── ActionButtons.test.tsx
│   │   └── ResultDisplay/
│   │       ├── TeamResult.tsx
│   │       ├── TeamResult.test.tsx
│   │       ├── TeamCard.tsx
│   │       └── TeamCard.test.tsx
│   │
│   ├── features/                   # ビジネスロジック（ドメイン層）
│   │   └── teamDivider/
│   │       ├── teamDivider.ts      # チーム分けアルゴリズム
│   │       ├── teamDivider.test.ts
│   │       ├── validator.ts        # バリデーションロジック
│   │       └── validator.test.ts
│   │
│   ├── store/                      # 状態管理
│   │   ├── teamStore.ts
│   │   └── teamStore.test.ts
│   │
│   ├── types/                      # TypeScript型定義
│   │   ├── member.ts
│   │   ├── team.ts
│   │   └── config.ts
│   │
│   ├── constants/                  # 定数
│   │   └── initialData.ts
│   │
│   ├── utils/                      # ユーティリティ関数
│   │   ├── clipboard.ts
│   │   ├── clipboard.test.ts
│   │   ├── formatter.ts
│   │   └── formatter.test.ts
│   │
│   ├── App.tsx
│   ├── App.test.tsx
│   ├── main.tsx
│   └── index.css
│
├── docs/
│   ├── requirement.md              # 要件定義書
│   └── skills.md                   # 技術仕様書（本ドキュメント）
│
├── README.md
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .prettierrc
└── .gitignore
```

### ディレクトリ設計の方針

| 方針               | 説明                                                   |
| ------------------ | ------------------------------------------------------ |
| **コロケーション** | テストファイルをソースコードに隣接配置（`*.test.tsx`） |
| **機能ベース分割** | 画面セクションごとにコンポーネントフォルダ作成         |
| **レイヤー分離**   | Presentation / Business / State を明確に分離           |
| **純粋性の保証**   | `features/` は副作用なし、テスト容易性 MAX             |
| **型ファースト**   | `types/` で型定義を一元管理、依存関係明確化            |

---

## 3. アーキテクチャ構成

### レイヤー構造

```
┌─────────────────────────────────────────────┐
│   Presentation Layer (Components)           │  ← UIコンポーネント（React）
│   - Header, MemberList, TeamConfig, etc.    │     - 表示とユーザーインタラクション
│                                             │     - 状態はprops経由で受け取る
└──────────────┬──────────────────────────────┘
               │ props, callbacks
               │
┌──────────────▼──────────────────────────────┐
│      State Management (Store)               │  ← グローバル状態（Zustand）
│   - members, config, teams                  │     - 状態の一元管理
│   - actions (addMember, createTeams, etc.)  │     - 副作用の集約
└──────────────┬──────────────────────────────┘
               │ pure functions
               │
┌──────────────▼──────────────────────────────┐
│    Business Logic (Features)                │  ← ドメインロジック（純粋関数）
│   - teamDivider: チーム分けアルゴリズム       │     - 副作用なし
│   - validator: バリデーション                │     - テスト容易性最優先
└──────────────┬──────────────────────────────┘
               │ types
               │
┌──────────────▼──────────────────────────────┐
│       Types & Constants                     │  ← 型定義・定数
│   - Member, Team, TeamConfig                │     - 契約定義
│   - 初期データ                               │
└─────────────────────────────────────────────┘
```

**依存方向**: 上位レイヤー → 下位レイヤー（下位は上位に依存しない）

### アーキテクチャ原則

#### 1. 関心の分離（Separation of Concerns）

| レイヤー           | 責務                           | 例                            |
| ------------------ | ------------------------------ | ----------------------------- |
| **Presentation**   | 表示とユーザーインタラクション | ボタンクリック、入力フォーム  |
| **State**          | 状態の一元管理、副作用の集約   | ストアの action 実行          |
| **Business Logic** | ドメインロジック（純粋関数）   | チーム分けアルゴリズム        |
| **Types**          | 型による契約定義               | Member, Team インターフェース |

#### 2. 依存性逆転（DIP 風アプローチ）

- コンポーネント → ストア（状態取得・更新）
- ストア → ビジネスロジック（純粋関数呼び出し）
- ビジネスロジック → 型のみ（他レイヤー依存なし）

#### 3. 単一責任原則（SRP）

- 各コンポーネント: 1 つの UI セクション担当
- 各ビジネスロジック: 1 つの明確な責務
- 各型定義: 1 つのドメイン概念

---

## 4. 主要モジュール設計

### 型定義 (`types/`)

```typescript
// member.ts
export type MemberGroup = "NAiS" | "KAG";

export interface Member {
  id: string;
  name: string;
  group: MemberGroup;
}

// config.ts
export type TeamType = "NAiS_ONLY" | "KAG_ONLY" | "MIXED";

export interface PatternRule {
  id: string;
  type: TeamType;
  teamCount: number;
  membersPerTeam: number;
}

export interface TeamConfig {
  totalTeams: number;
  rules: PatternRule[];
}

// team.ts
export interface Team {
  id: string;
  name: string;
  members: Member[];
  type?: TeamType;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
```

### ビジネスロジック (`features/teamDivider/`)

```typescript
// teamDivider.ts

/**
 * チーム分けメイン関数
 * @param members - 全メンバーリスト
 * @param config - チーム分け設定
 * @returns 生成されたチームリスト
 */
export function divideTeams(members: Member[], config: TeamConfig): Team[] {
  // 1. バリデーション
  const validation = validateConfig(members, config);
  if (!validation.isValid) {
    throw new Error(validation.errors[0].message);
  }

  // 2. ルール適用（制約チーム作成）
  const constrainedTeams = applyPatternRules(members, config.rules);

  // 3. 残りメンバーでランダム分割
  const remainingTeams = divideRemainingMembers(
    constrainedTeams.remainingMembers,
    config.totalTeams - constrainedTeams.teams.length
  );

  return [...constrainedTeams.teams, ...remainingTeams];
}

/**
 * 配列をランダムシャッフル（Fisher-Yatesアルゴリズム）
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// validator.ts

/**
 * チーム分け設定のバリデーション
 */
export function validateConfig(
  members: Member[],
  config: TeamConfig
): ValidationResult {
  const errors: ValidationError[] = [];

  // メンバー数チェック
  if (members.length === 0) {
    errors.push({ field: "members", message: "メンバーが登録されていません" });
  }

  // チーム数チェック
  if (config.totalTeams > members.length) {
    errors.push({
      field: "totalTeams",
      message: `チーム数がメンバー数を超えています（必要: ${config.totalTeams}, 現在: ${members.length}）`,
    });
  }

  // ルール整合性チェック
  const naisCount = members.filter((m) => m.group === "NAiS").length;
  const kagCount = members.filter((m) => m.group === "KAG").length;

  for (const rule of config.rules) {
    const requiredMembers = rule.teamCount * rule.membersPerTeam;

    if (rule.type === "NAiS_ONLY" && requiredMembers > naisCount) {
      errors.push({
        field: "rules",
        message: `NAiSメンバーが足りません（必要: ${requiredMembers}, 現在: ${naisCount}）`,
      });
    }

    if (rule.type === "KAG_ONLY" && requiredMembers > kagCount) {
      errors.push({
        field: "rules",
        message: `KAGメンバーが足りません（必要: ${requiredMembers}, 現在: ${kagCount}）`,
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

### 状態管理 (`store/teamStore.ts`)

```typescript
import { create } from "zustand";
import { Member, Team, TeamConfig, PatternRule } from "@/types";
import { divideTeams } from "@/features/teamDivider/teamDivider";
import { INITIAL_MEMBERS } from "@/constants/initialData";

interface TeamState {
  // State
  members: Member[];
  config: TeamConfig;
  teams: Team[];
  isLoading: boolean;
  error: string | null;

  // Member Actions
  addMember: (member: Omit<Member, "id">) => void;
  removeMember: (id: string) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  resetMembers: () => void;

  // Config Actions
  updateConfig: (config: Partial<TeamConfig>) => void;
  addPatternRule: (rule: Omit<PatternRule, "id">) => void;
  removePatternRule: (id: string) => void;

  // Team Actions
  createTeams: () => Promise<void>;
  clearTeams: () => void;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  // Initial State
  members: INITIAL_MEMBERS,
  config: {
    totalTeams: 3,
    rules: [],
  },
  teams: [],
  isLoading: false,
  error: null,

  // Member Actions
  addMember: (member) => {
    const newMember: Member = {
      ...member,
      id: crypto.randomUUID(),
    };
    set((state) => ({
      members: [...state.members, newMember],
    }));
  },

  removeMember: (id) => {
    set((state) => ({
      members: state.members.filter((m) => m.id !== id),
    }));
  },

  updateMember: (id, updates) => {
    set((state) => ({
      members: state.members.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    }));
  },

  resetMembers: () => {
    set({ members: INITIAL_MEMBERS });
  },

  // Config Actions
  updateConfig: (config) => {
    set((state) => ({
      config: { ...state.config, ...config },
    }));
  },

  addPatternRule: (rule) => {
    const newRule: PatternRule = {
      ...rule,
      id: crypto.randomUUID(),
    };
    set((state) => ({
      config: {
        ...state.config,
        rules: [...state.config.rules, newRule],
      },
    }));
  },

  removePatternRule: (id) => {
    set((state) => ({
      config: {
        ...state.config,
        rules: state.config.rules.filter((r) => r.id !== id),
      },
    }));
  },

  // Team Actions
  createTeams: async () => {
    set({ isLoading: true, error: null });

    try {
      // アニメーション演出のため遅延
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const { members, config } = get();
      const teams = divideTeams(members, config);

      set({ teams, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "不明なエラー",
        isLoading: false,
      });
    }
  },

  clearTeams: () => {
    set({ teams: [], error: null });
  },
}));
```

---

## 5. テスト戦略

### TDD 開発フロー

```
┌──────────┐      ┌──────────┐      ┌──────────┐
│   RED    │  →   │  GREEN   │  →   │ REFACTOR │
│          │      │          │      │          │
│テスト記述│      │実装最小限│      │改善・最適化│
│（失敗）  │      │（成功）  │      │（成功維持）│
└──────────┘      └──────────┘      └──────────┘
```

#### 1. Red: テストを先に書く

```typescript
// teamDivider.test.ts
import { describe, test, expect } from "vitest";
import { divideTeams } from "./teamDivider";

describe("divideTeams", () => {
  test("10名を2チームに分割できる", () => {
    const members = createMockMembers(10);
    const config = { totalTeams: 2, rules: [] };

    const result = divideTeams(members, config);

    expect(result).toHaveLength(2);
    expect(result[0].members.length + result[1].members.length).toBe(10);
  });
});
```

#### 2. Green: 最小限の実装

```typescript
export function divideTeams(members: Member[], config: TeamConfig): Team[] {
  // まず動くコードを書く
  return [
    { id: "1", name: "WIP 1", members: members.slice(0, 5) },
    { id: "2", name: "WIP 2", members: members.slice(5) },
  ];
}
```

#### 3. Refactor: リファクタリング

```typescript
export function divideTeams(members: Member[], config: TeamConfig): Team[] {
  // より堅牢な実装に改善
  const shuffled = shuffleArray(members);
  const teamsPerMember = Math.ceil(members.length / config.totalTeams);
  // ...
}
```

### テストレベル別戦略

| レベル               | 対象                   | ツール             | カバレッジ目標 | 優先度 |
| -------------------- | ---------------------- | ------------------ | -------------- | ------ |
| **Unit Test**        | `features/`, `utils/`  | Vitest             | 100%           | 最高   |
| **Integration Test** | `store/` + `features/` | Vitest             | 90%+           | 高     |
| **Component Test**   | `components/`          | Testing Library    | 80%+           | 中     |
| **E2E Test**         | 全体フロー             | Playwright（将来） | 主要パス       | 低     |

### テストケース例

#### Unit Test（ビジネスロジック）

```typescript
// validator.test.ts
describe("validateConfig", () => {
  test("メンバーが0人の場合エラー", () => {
    const result = validateConfig([], { totalTeams: 2, rules: [] });
    expect(result.isValid).toBe(false);
    expect(result.errors[0].message).toContain("メンバーが登録されていません");
  });

  test("NAiSメンバー不足を検出", () => {
    const members = [{ id: "1", name: "テスト", group: "NAiS" }];
    const config = {
      totalTeams: 2,
      rules: [{ id: "1", type: "NAiS_ONLY", teamCount: 1, membersPerTeam: 3 }],
    };

    const result = validateConfig(members, config);
    expect(result.isValid).toBe(false);
    expect(result.errors[0].message).toContain("NAiSメンバーが足りません");
  });
});
```

#### Component Test（UI）

```typescript
// MemberList.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemberList } from "./MemberList";

describe("MemberList", () => {
  test("メンバーが表示される", () => {
    const members = [
      { id: "1", name: "山本", group: "NAiS" },
      { id: "2", name: "岡本", group: "KAG" },
    ];

    render(<MemberList members={members} />);

    expect(screen.getByText("山本")).toBeInTheDocument();
    expect(screen.getByText("岡本")).toBeInTheDocument();
  });

  test("削除ボタンクリックでコールバック実行", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const members = [{ id: "1", name: "山本", group: "NAiS" }];

    render(<MemberList members={members} onRemove={onRemove} />);

    const deleteButton = screen.getByRole("button", { name: /削除/i });
    await user.click(deleteButton);

    expect(onRemove).toHaveBeenCalledWith("1");
  });
});
```

---

## 6. CI/CD 戦略

### GitHub Actions ワークフロー

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Run tests with coverage
        run: npm run test -- --coverage

      - name: Build
        run: npm run build

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        if: github.event_name == 'pull_request'

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install and build
        run: |
          npm ci
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 品質ゲート

| ステージ          | チェック項目                   | 失敗時の動作     |
| ----------------- | ------------------------------ | ---------------- |
| **Pre-commit**    | Lint, Prettier                 | コミットブロック |
| **PR 作成時**     | Test, Coverage, Type check     | マージブロック   |
| **main merge 時** | 全チェック + ビルド + デプロイ | デプロイ停止     |

---

## 7. 開発推奨順序

### フェーズ 1: 基盤構築（TDD 準備）

1. プロジェクトセットアップ（Vite + React + TypeScript）
2. テスト環境構築（Vitest + Testing Library）
3. Linter/Formatter 設定
4. 型定義作成 (`types/`)
5. 定数・初期データ (`constants/`)

### フェーズ 2: コアロジック（TDD 実践）

1. バリデーションロジック（`validator.ts` + テスト）
2. シャッフルアルゴリズム（`shuffleArray` + テスト）
3. チーム分けロジック（`divideTeams` + テスト）
4. ユーティリティ関数（`utils/` + テスト）

### フェーズ 3: 状態管理

1. ストア実装（`teamStore.ts`）
2. ストアの統合テスト

### フェーズ 4: UI 構築（ボトムアップ）

1. 共通コンポーネント（Badge, Button 等）
2. Header コンポーネント
3. MemberManagement コンポーネント
4. TeamConfiguration コンポーネント
5. ActionArea コンポーネント
6. ResultDisplay コンポーネント
7. App 統合

### フェーズ 5: 仕上げ

1. アニメーション追加
2. エラーハンドリング強化
3. アクセシビリティ対応
4. E2E テスト（オプション）
5. パフォーマンス最適化

---

## 8. パッケージ構成例

```json
{
  "name": "team-assignment",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit",
    "prepare": "husky install"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zustand": "^4.4.7",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "@vitest/ui": "^1.0.4",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@testing-library/jest-dom": "^6.1.5",
    "autoprefixer": "^10.4.16",
    "daisyui": "^4.4.19",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "happy-dom": "^12.10.3",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0",
    "postcss": "^8.4.32",
    "prettier": "^3.1.1",
    "prettier-plugin-tailwindcss": "^0.5.9",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.3.3",
    "vite": "^5.0.8",
    "vitest": "^1.0.4",
    "@vitest/coverage-v8": "^1.0.4"
  }
}
```

---

## 9. まとめ

### TDD 開発における優位点

| 観点                 | メリット                           |
| -------------------- | ---------------------------------- |
| **設計品質**         | テストファーストで自然に疎結合設計 |
| **デバッグ効率**     | 問題箇所の特定が高速               |
| **リファクタリング** | 安全に改善可能                     |
| **ドキュメント**     | テストがそのまま仕様書             |
| **品質保証**         | 高カバレッジで回帰バグ防止         |

### 推奨プラクティス

1. **小さく始める**: 最小単位から順にテスト・実装
2. **Red-Green-Refactor**: サイクルを厳守
3. **純粋関数優先**: 副作用を最小化
4. **型で保護**: TypeScript の型システムを最大活用
5. **継続的改善**: コードレビューでテストも確認

このアーキテクチャにより、保守性が高く、テストしやすい堅牢なチーム分けアプリを構築できます。

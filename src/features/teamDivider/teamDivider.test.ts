import { describe, it, expect } from 'vitest';
import { shuffleArray } from './teamDivider';

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

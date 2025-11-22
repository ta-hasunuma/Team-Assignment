import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PatternRuleList } from './PatternRuleList';
import type { PatternRule } from '@/types';

describe('PatternRuleList', () => {
  it('パターンルールリストが表示される', () => {
    const onAdd = vi.fn();
    const onRemove = vi.fn();

    render(<PatternRuleList rules={[]} onAdd={onAdd} onRemove={onRemove} />);

    expect(screen.getByTestId('pattern-rule-list')).toBeInTheDocument();
    expect(screen.getByText('パターン制約')).toBeInTheDocument();
  });

  it('既存のルールが表示される', () => {
    const rules: PatternRule[] = [
      { id: 'rule-1', type: 'NAiS_ONLY', teamCount: 1, membersPerTeam: 3 },
      { id: 'rule-2', type: 'KAG_ONLY', teamCount: 2, membersPerTeam: 4 },
    ];
    const onAdd = vi.fn();
    const onRemove = vi.fn();

    render(<PatternRuleList rules={rules} onAdd={onAdd} onRemove={onRemove} />);

    expect(screen.getByText('1チーム × 3名')).toBeInTheDocument();
    expect(screen.getByText('2チーム × 4名')).toBeInTheDocument();
  });

  it('ルールを追加できる', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const onRemove = vi.fn();

    render(<PatternRuleList rules={[]} onAdd={onAdd} onRemove={onRemove} />);

    const addButton = screen.getByTestId('add-rule-button');
    await user.click(addButton);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'NAiS_ONLY',
        teamCount: 1,
        membersPerTeam: 3,
      })
    );
  });

  it('チームタイプを変更して追加できる', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const onRemove = vi.fn();

    render(<PatternRuleList rules={[]} onAdd={onAdd} onRemove={onRemove} />);

    const typeSelect = screen.getByTestId('rule-type-select');
    await user.selectOptions(typeSelect, 'KAG_ONLY');

    const addButton = screen.getByTestId('add-rule-button');
    await user.click(addButton);

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'KAG_ONLY',
      })
    );
  });

  it('チーム数を変更して追加できる', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const onRemove = vi.fn();

    render(<PatternRuleList rules={[]} onAdd={onAdd} onRemove={onRemove} />);

    const teamCountInput = screen.getByTestId('rule-team-count-input');
    await user.tripleClick(teamCountInput);
    await user.keyboard('2');

    const addButton = screen.getByTestId('add-rule-button');
    await user.click(addButton);

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        teamCount: 2,
      })
    );
  });

  it('1チームの人数を変更して追加できる', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const onRemove = vi.fn();

    render(<PatternRuleList rules={[]} onAdd={onAdd} onRemove={onRemove} />);

    const membersInput = screen.getByTestId('rule-members-per-team-input');
    await user.tripleClick(membersInput);
    await user.keyboard('5');

    const addButton = screen.getByTestId('add-rule-button');
    await user.click(addButton);

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        membersPerTeam: 5,
      })
    );
  });

  it('ルールを削除できる', async () => {
    const user = userEvent.setup();
    const rules: PatternRule[] = [
      { id: 'rule-1', type: 'NAiS_ONLY', teamCount: 1, membersPerTeam: 3 },
    ];
    const onAdd = vi.fn();
    const onRemove = vi.fn();

    render(<PatternRuleList rules={rules} onAdd={onAdd} onRemove={onRemove} />);

    const removeButton = screen.getByTestId('remove-rule-rule-1');
    await user.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith('rule-1');
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('ルール追加後にフォームがリセットされる', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    const onRemove = vi.fn();

    render(<PatternRuleList rules={[]} onAdd={onAdd} onRemove={onRemove} />);

    const teamCountInput = screen.getByTestId(
      'rule-team-count-input'
    ) as HTMLInputElement;
    const membersInput = screen.getByTestId(
      'rule-members-per-team-input'
    ) as HTMLInputElement;

    await user.tripleClick(teamCountInput);
    await user.keyboard('5');
    await user.tripleClick(membersInput);
    await user.keyboard('7');

    const addButton = screen.getByTestId('add-rule-button');
    await user.click(addButton);

    // リセットされて初期値に戻る
    expect(teamCountInput.value).toBe('1');
    expect(membersInput.value).toBe('3');
  });
});

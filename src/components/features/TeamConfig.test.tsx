import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeamConfig } from './TeamConfig';

describe('TeamConfig', () => {
  it('チーム数設定が表示される', () => {
    const onUpdate = vi.fn();

    render(<TeamConfig totalTeams={3} onUpdate={onUpdate} />);

    expect(screen.getByTestId('team-config')).toBeInTheDocument();
    expect(screen.getByText('全体のWIP数')).toBeInTheDocument();
  });

  it('現在のチーム数が表示される', () => {
    const onUpdate = vi.fn();

    render(<TeamConfig totalTeams={5} onUpdate={onUpdate} />);

    const input = screen.getByTestId('total-teams-input') as HTMLInputElement;
    expect(input.value).toBe('5');
  });

  it('チーム数を変更するとonUpdateが呼ばれる', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();

    render(<TeamConfig totalTeams={3} onUpdate={onUpdate} />);

    const input = screen.getByTestId('total-teams-input');
    await user.tripleClick(input);
    await user.keyboard('4');

    expect(onUpdate).toHaveBeenCalledWith(4);
  });

  it('無効な値では更新されない', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();

    render(<TeamConfig totalTeams={3} onUpdate={onUpdate} />);

    const input = screen.getByTestId('total-teams-input');
    await user.tripleClick(input);
    await user.keyboard('0');

    // 0以下の値では更新されない
    expect(onUpdate).not.toHaveBeenCalled();
  });

  it('説明テキストが表示される', () => {
    const onUpdate = vi.fn();

    render(<TeamConfig totalTeams={3} onUpdate={onUpdate} />);

    expect(
      screen.getByText('作成するチーム数を指定してください')
    ).toBeInTheDocument();
  });
});

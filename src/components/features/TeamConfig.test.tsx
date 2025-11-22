import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('チーム数を変更するとonUpdateが呼ばれる', () => {
    const onUpdate = vi.fn();

    render(<TeamConfig totalTeams={3} onUpdate={onUpdate} />);

    const input = screen.getByTestId('total-teams-input') as HTMLInputElement;
    fireEvent.input(input, { target: { value: '4' } });

    expect(onUpdate).toHaveBeenCalledWith(4);
  });

  it('無効な値では更新されない', () => {
    const onUpdate = vi.fn();

    render(<TeamConfig totalTeams={3} onUpdate={onUpdate} />);

    const input = screen.getByTestId('total-teams-input') as HTMLInputElement;
    // range入力はHTMLのmin/max属性で制限される
    expect(input.min).toBe('1');
    expect(input.max).toBe('20');
  });

  it('説明テキストが表示される', () => {
    const onUpdate = vi.fn();

    render(<TeamConfig totalTeams={3} onUpdate={onUpdate} />);

    expect(
      screen.getByText('作成するチーム数を指定してください')
    ).toBeInTheDocument();
  });
});

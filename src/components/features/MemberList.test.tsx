import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemberList } from './MemberList';
import type { Member } from '@/types';

describe('MemberList', () => {
  const mockMembers: Member[] = [
    { id: '1', name: 'Alice', group: 'NAiS' },
    { id: '2', name: 'Bob', group: 'KAG' },
    { id: '3', name: 'Charlie', group: 'NAiS' },
  ];

  it('メンバー一覧が表示される', () => {
    const onRemove = vi.fn();

    render(<MemberList members={mockMembers} onRemove={onRemove} />);

    expect(screen.getByTestId('member-list')).toBeInTheDocument();
    expect(screen.getByText('メンバー一覧')).toBeInTheDocument();
  });

  it('各メンバーが正しく表示される', () => {
    const onRemove = vi.fn();

    render(<MemberList members={mockMembers} onRemove={onRemove} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('メンバーが0人の場合、空メッセージが表示される', () => {
    const onRemove = vi.fn();

    render(<MemberList members={[]} onRemove={onRemove} />);

    // statsが表示されるが、0人の時は表示されない
    expect(
      screen.getByText('メンバーが登録されていません')
    ).toBeInTheDocument();
  });

  it('削除ボタンをクリックするとonRemoveが呼ばれる', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(<MemberList members={mockMembers} onRemove={onRemove} />);

    const removeButton = screen.getByTestId('remove-button-1');
    await user.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith('1');
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('削除ボタンに適切なaria-labelが設定されている', () => {
    const onRemove = vi.fn();

    render(<MemberList members={mockMembers} onRemove={onRemove} />);

    const removeButton = screen.getByLabelText('Aliceを削除');
    expect(removeButton).toBeInTheDocument();
  });
});

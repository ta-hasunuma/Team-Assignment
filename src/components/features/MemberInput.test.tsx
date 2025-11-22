import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemberInput } from './MemberInput';

describe('MemberInput', () => {
  it('メンバー追加フォームが表示される', () => {
    const onAdd = vi.fn();

    render(<MemberInput onAdd={onAdd} />);

    expect(screen.getByTestId('member-input')).toBeInTheDocument();
    expect(screen.getByText('メンバー追加')).toBeInTheDocument();
  });

  it('名前入力欄が表示される', () => {
    const onAdd = vi.fn();

    render(<MemberInput onAdd={onAdd} />);

    const nameInput = screen.getByTestId('name-input');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('placeholder', '名前を入力');
  });

  it('グループ選択欄が表示される', () => {
    const onAdd = vi.fn();

    render(<MemberInput onAdd={onAdd} />);

    const groupSelect = screen.getByTestId('group-select');
    expect(groupSelect).toBeInTheDocument();
  });

  it('名前を入力して追加ボタンをクリックするとonAddが呼ばれる', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<MemberInput onAdd={onAdd} />);

    const nameInput = screen.getByTestId('name-input');
    const addButton = screen.getByTestId('add-button');

    await user.type(nameInput, 'Test User');
    await user.click(addButton);

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test User',
        group: 'NAiS',
      })
    );
  });

  it('追加後に入力欄がクリアされる', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<MemberInput onAdd={onAdd} />);

    const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
    const addButton = screen.getByTestId('add-button');

    await user.type(nameInput, 'Test User');
    await user.click(addButton);

    expect(nameInput.value).toBe('');
  });

  it('グループを変更して追加できる', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<MemberInput onAdd={onAdd} />);

    const nameInput = screen.getByTestId('name-input');
    const addButton = screen.getByTestId('add-button');

    await user.type(nameInput, 'KAG User');

    // ラジオボタンでKAGを選択
    const kagRadio = screen.getByRole('radio', { name: 'KAG' });
    await user.click(kagRadio);

    await user.click(addButton);

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'KAG User',
        group: 'KAG',
      })
    );
  });

  it('空白の名前では追加ボタンが無効化される', () => {
    const onAdd = vi.fn();

    render(<MemberInput onAdd={onAdd} />);

    const addButton = screen.getByTestId('add-button');
    expect(addButton).toBeDisabled();
  });

  it('名前を入力すると追加ボタンが有効化される', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<MemberInput onAdd={onAdd} />);

    const nameInput = screen.getByTestId('name-input');
    const addButton = screen.getByTestId('add-button');

    expect(addButton).toBeDisabled();

    await user.type(nameInput, 'Test');

    expect(addButton).not.toBeDisabled();
  });

  it('前後の空白をトリムして追加する', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<MemberInput onAdd={onAdd} />);

    const nameInput = screen.getByTestId('name-input');
    const addButton = screen.getByTestId('add-button');

    await user.type(nameInput, '  Test User  ');
    await user.click(addButton);

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test User',
      })
    );
  });

  it('空白のみの名前では追加されない', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(<MemberInput onAdd={onAdd} />);

    const nameInput = screen.getByTestId('name-input');
    const addButton = screen.getByTestId('add-button');

    await user.type(nameInput, '   ');

    // 空白のみの場合、ボタンは無効化されているはず
    expect(addButton).toBeDisabled();
  });
});

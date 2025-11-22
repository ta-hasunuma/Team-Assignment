import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('アプリケーションが正しくレンダリングされる', () => {
    render(<App />);
    expect(screen.getByTestId('app')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('初期メンバーが表示される', () => {
    render(<App />);
    expect(screen.getByTestId('member-list')).toBeInTheDocument();
  });

  it('チーム設定が表示される', () => {
    render(<App />);
    expect(screen.getByText('チーム設定')).toBeInTheDocument();
    expect(screen.getByTestId('team-config')).toBeInTheDocument();
  });

  it('チーム作成ボタンが表示される', () => {
    render(<App />);
    const createButton = screen.getByTestId('create-teams-button');
    expect(createButton).toBeInTheDocument();
    expect(createButton).not.toBeDisabled();
  });

  it('チーム作成後に結果が表示される', async () => {
    const user = userEvent.setup();
    render(<App />);

    const createButton = screen.getByTestId('create-teams-button');
    await user.click(createButton);

    await waitFor(() => {
      expect(screen.getByText('チーム分け結果')).toBeInTheDocument();
    });
  });

  it('結果クリアボタンでチーム結果がクリアされる', async () => {
    const user = userEvent.setup();
    render(<App />);

    // チーム作成
    const createButton = screen.getByTestId('create-teams-button');
    await user.click(createButton);

    await waitFor(() => {
      expect(screen.getByText('チーム分け結果')).toBeInTheDocument();
    });

    // 結果をクリア
    const clearButton = screen.getByTestId('clear-teams-button');
    await user.click(clearButton);

    await waitFor(() => {
      expect(screen.queryByText('チーム分け結果')).not.toBeInTheDocument();
    });
  });
});

/**
 * アプリケーションのヘッダーコンポーネント
 */
export function Header() {
  return (
    <header className="navbar bg-base-200" data-testid="header">
      <div className="flex-1">
        <h1 className="px-4 text-2xl font-bold">Team Divider for NAiS</h1>
      </div>
    </header>
  );
}

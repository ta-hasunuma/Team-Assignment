import { Users, Sparkles } from 'lucide-react';

/**
 * アプリケーションのヘッダーコンポーネント
 */
export function Header() {
  return (
    <header
      className="navbar animate-fade-in bg-gradient-to-r from-primary to-secondary text-primary-content shadow-lg"
      data-testid="header"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 px-4">
          <div className="placeholder avatar">
            <div className="bg-neutral-focus w-12 rounded-full text-neutral-content">
              <Users size={24} />
            </div>
          </div>
          <div>
            <h1 className="animate-scale-in text-2xl font-bold">
              Team Divider
            </h1>
            <p className="flex items-center gap-1 text-sm opacity-90">
              <Sparkles size={14} />
              for NAiS
            </p>
          </div>
        </div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 text-base-content shadow-lg"
          >
            <li>
              <a>使い方</a>
            </li>
            <li>
              <a>設定</a>
            </li>
            <li>
              <a>について</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

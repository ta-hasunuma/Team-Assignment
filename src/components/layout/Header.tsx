import { Users, Sparkles } from 'lucide-react';

/**
 * アプリケーションのヘッダーコンポーネント
 */
export function Header() {
  return (
    <header
      className="animate-fade-in bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
      data-testid="header"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <Users size={24} />
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
        <div className="relative">
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10">
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
          </button>
        </div>
      </div>
    </header>
  );
}

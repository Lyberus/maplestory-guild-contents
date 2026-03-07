export default function Header({ isDark, setIsDark }) {
  return (
    <header className="w-full bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-2xl">list_alt</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">메이플스토리 길드 컨텐츠 기록기</h1>
      </div>
      
      <button 
        onClick={() => setIsDark(!isDark)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-border-dark hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300"
      >
        <span className="material-symbols-outlined text-[20px] leading-none">
          {isDark ? 'light_mode' : 'dark_mode'}
        </span>
        <span className="text-sm font-semibold tracking-wide">
          {isDark ? '라이트 모드' : '다크 모드'}
        </span>
      </button>
    </header>
  );
}
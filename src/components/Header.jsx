export default function Header({ isDark, setIsDark }) {
  return (
    <header className="w-full bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-2xl">visibility</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Vision Analyzer Web</h1>
      </div>
      <button 
        onClick={() => setIsDark(!isDark)}
        className="p-2 rounded-lg bg-background-light dark:bg-background-dark hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
      >
        <span className="material-symbols-outlined text-[20px]">
          {isDark ? 'dark_mode' : 'light_mode'}
        </span>
      </button>
    </header>
  );
}
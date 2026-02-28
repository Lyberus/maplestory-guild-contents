export default function RemoteWidget() {
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
        <div
            className="w-64 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-border-light dark:border-border-dark overflow-hidden ring-1 ring-slate-900/5">
            {/* Widget Header */}
            <div className="bg-primary px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                    <span className="material-symbols-outlined text-[18px]">settings_remote</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Remote</span>
                </div>
                <button className="text-white/70 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
            </div>
            {/* Widget Body */}
            <div className="p-4 flex flex-col gap-4">
                {/* Status Display */}
                <div className="flex flex-col items-center justify-center py-2">
                    <span
                        className="text-xs text-slate-400 dark:text-slate-500 uppercase font-semibold tracking-wider">Processed
                        Data</span>
                    <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">124</span>
                        <span className="text-xs text-slate-500 font-medium">items</span>
                    </div>
                </div>
                <div className="h-px bg-border-light dark:bg-border-dark w-full"></div>
                {/* Controls */}
                <div className="flex flex-col gap-2">
                    <button
                        className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors">
                        <span className="material-symbols-outlined text-[16px]">picture_in_picture_alt</span>
                        Toggle PIP Mode
                    </button>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        <button
                            className="flex items-center justify-center gap-1 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg text-xs font-bold transition-colors">
                            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                            Start
                        </button>
                        <button
                            className="flex items-center justify-center gap-1 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-xs font-bold transition-colors">
                            <span className="material-symbols-outlined text-[16px]">stop</span>
                            Stop
                        </button>
                    </div>
                    <button
                        className="flex items-center justify-center gap-2 w-full py-2 mt-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg text-xs font-medium transition-colors">
                        <span className="material-symbols-outlined text-[16px]">replay</span>
                        Reset Counter
                    </button>
                </div>
            </div>
            {/* Connection Status Footer */}
            <div
                className="bg-slate-50 dark:bg-slate-800/80 px-4 py-2 flex items-center justify-between border-t border-border-light dark:border-border-dark">
                <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Live</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">v2.4.0</span>
            </div>
        </div>
    </div>
  );
}
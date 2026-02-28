export default function MainDashboard() {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Dashboard Header & Controls */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Main Dashboard</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your real-time computer vision analysis sessions.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium text-sm transition-colors shadow-sm shadow-primary/30">
                        <span className="material-symbols-outlined text-[18px]">videocam</span>
                        Start Capture
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
                        <span className="material-symbols-outlined text-[18px]">content_paste</span>
                        Paste Clipboard
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors">
                        <span className="material-symbols-outlined text-[18px]">upload_file</span>
                        Upload File
                    </button>
                </div>
            </div>
            {/* Secondary Actions */}
            <div className="flex items-center gap-4 py-4 border-t border-border-light dark:border-border-dark">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Data
                    Actions</span>
                <button
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-lg text-sm font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    Reset Records
                </button>
                <button
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-lg text-sm font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    Export CSV/XLSX
                </button>
            </div>
            {/* Data Table */}
            <div
                className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr
                                className="bg-slate-50 dark:bg-slate-800/50 border-b border-border-light dark:border-border-dark">
                                <th
                                    className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-24">
                                    ID</th>
                                <th
                                    className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Sample Name</th>
                                <th
                                    className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                    Confidence</th>
                                <th
                                    className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                    Accuracy</th>
                                <th
                                    className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                    Speed (ms)</th>
                                <th
                                    className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-12">
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="divide-y divide-border-light dark:divide-border-dark text-slate-700 dark:text-slate-300">
                            <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">001</td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-8 rounded bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                                            AS</div>
                                        <span>Alpha Sample</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-right font-mono">0.98</td>
                                <td className="px-6 py-4 text-sm text-right font-mono">0.95</td>
                                <td
                                    className="px-6 py-4 text-sm text-right font-mono text-emerald-600 dark:text-emerald-400">
                                    12ms</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all text-slate-400">
                                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">002</td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold">
                                            BS</div>
                                        <span>Beta Sample</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-right font-mono">0.88</td>
                                <td className="px-6 py-4 text-sm text-right font-mono">0.85</td>
                                <td
                                    className="px-6 py-4 text-sm text-right font-mono text-emerald-600 dark:text-emerald-400">
                                    14ms</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all text-slate-400">
                                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">003</td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-8 rounded bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-xs font-bold">
                                            GS</div>
                                        <span>Gamma Sample</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-right font-mono">0.76</td>
                                <td className="px-6 py-4 text-sm text-right font-mono">0.82</td>
                                <td className="px-6 py-4 text-sm text-right font-mono text-amber-600 dark:text-amber-400">
                                    24ms</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all text-slate-400">
                                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">004</td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-8 rounded bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 text-xs font-bold">
                                            DS</div>
                                        <span>Delta Sample</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-right font-mono">0.92</td>
                                <td className="px-6 py-4 text-sm text-right font-mono">0.89</td>
                                <td
                                    className="px-6 py-4 text-sm text-right font-mono text-emerald-600 dark:text-emerald-400">
                                    11ms</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all text-slate-400">
                                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">005</td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-8 rounded bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 text-xs font-bold">
                                            ES</div>
                                        <span>Epsilon Sample</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-right font-mono">0.65</td>
                                <td className="px-6 py-4 text-sm text-right font-mono">0.70</td>
                                <td className="px-6 py-4 text-sm text-right font-mono text-red-600 dark:text-red-400">45ms
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all text-slate-400">
                                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Pagination Footer */}
                <div
                    className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-t border-border-light dark:border-border-dark flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Showing 1 to 5 of 124 entries</span>
                    <div className="flex gap-1">
                        <button
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 disabled:opacity-50">
                            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                        </button>
                        <button
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 disabled:opacity-50">
                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
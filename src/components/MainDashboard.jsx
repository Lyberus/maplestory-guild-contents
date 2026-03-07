import exportToExcel from '../utils/ExportData';

export default function MainDashboard({ captureController, processManualImage, records, setRecords }) {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Dashboard Header & Controls */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Dashboard</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">캡쳐 또는 클립보드, 업로드 버튼을 통해서 이미지를 분석하세요.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {
                        captureController.isRecording ?
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition-colors shadow-sm shadow-red-500/30"
                            onClick={() => captureController.stopCapture()}>
                            <span className="material-symbols-outlined text-[18px]">stop_circle</span>
                            화면 캡쳐 중지
                        </button>
                        :
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium text-sm transition-colors shadow-sm shadow-primary/30"
                            onClick={() => captureController.startCapture()}>
                            <span className="material-symbols-outlined text-[18px]">videocam</span>
                            화면 캡쳐 시작
                        </button>
                    }
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors"
                        onClick={async () => {
                            try {
                                const clipboardItems = await navigator.clipboard.read();
                                for (const item of clipboardItems) {
                                    const imageTypes = item.types.filter(type => type.startsWith('image/'));
                                    if (imageTypes.length > 0) {
                                        const blob = await item.getType(imageTypes[0]);
                                        processManualImage(blob);
                                        return;
                                    }
                                }
                                alert("클립보드에 이미지가 없습니다.");
                            } catch (err) {
                                console.error("클립보드 읽기 실패:", err);
                                alert("클립보드 접근 권한이 거부되었거나 지원하지 않는 환경입니다.");
                            }
                        }}>
                        <span className="material-symbols-outlined text-[18px]">content_paste</span>
                        이미지 붙여넣기
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-sm transition-colors"
                        onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    processManualImage(file);
                                }
                            };
                            input.click();
                        }}>
                        <span className="material-symbols-outlined text-[18px]">upload_file</span>
                        이미지 파일 선택
                    </button>
                </div>
            </div>
            {/* Secondary Actions */}
            <div className="flex items-center gap-4 py-4 border-t border-border-light dark:border-border-dark">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Data Action</span>
                <button
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-lg text-sm font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors"
                    onClick={() => { setRecords(() => []); }} >
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    기록 초기화
                </button>
                <button
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-lg text-sm font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors"
                    onClick={() => { exportToExcel(records); }} >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    XLSX로 내보내기
                </button>
            </div>
            {/* Data Table */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
                <div className="overflow-x-auto overflow-y-auto scrollbar-hide max-h-[550px]">
                    <table className="w-full text-left border-collapse relative">
                        <thead>
                            <tr className="border-b border-border-light dark:border-border-dark">
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-24">
                                    번호
                                </th>
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    이름
                                </th>
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                    주간미션
                                </th>
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                    지하수로
                                </th>
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                    플래그레이스
                                </th>
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-12">
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light dark:divide-border-dark text-slate-700 dark:text-slate-300">
                            {records.map((record, index) => (
                                <tr key={index} className="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                        {(index + 1).toString().padStart(3, '0')}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-3">
                                            <span>{record.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right font-mono text-sky-600 dark:text-sky-400">
                                        {record.week.toLocaleString('ko-KR')}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right font-mono text-violet-600 dark:text-violet-400">
                                        {record.culv.toLocaleString('ko-KR')}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right font-mono text-teal-600 dark:text-teal-400">
                                        {record.flag.toLocaleString('ko-KR')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all text-slate-400"
                                            onClick={() => { setRecords((prevRecords) => [...prevRecords.slice(0, index), ...prevRecords.slice(index + 1)]); }} >
                                            <span className="material-symbols-outlined text-[18px]">close</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Footer */}
                <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-t border-border-light dark:border-border-dark flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Showing {records.length} records</span>
                </div>
            </div>
        </div>
    </main>
  );
}
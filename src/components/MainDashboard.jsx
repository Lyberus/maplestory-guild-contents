import exportToExcel from '../utils/ExportData';

export default function MainDashboard({ captureController, processManualImage, records, setRecords }) {
  return (
    // [변경 1] 2xl 해상도 이상에서 여백을 조금 더 넓게 확보 (2xl:p-12)
    <main className="flex-1 overflow-y-auto p-6 md:p-10 2xl:p-12 relative">
        {/* [변경 2] 아주 큰 모니터에서는 컨테이너 너비를 1536px까지 확장 & 섹션 간격 넓힘 */}
        <div className="max-w-7xl 2xl:max-w-screen-2xl w-full mx-auto space-y-8 2xl:space-y-10">
            {/* Dashboard Header & Controls */}
            <div className="space-y-6">
                {/* 1. Title & Action Buttons */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl 2xl:text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-all">길드원 참여 현황 분석</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm 2xl:text-base transition-all">
                            캡쳐, 클립보드 또는 파일 업로드를 통해 <strong>'길드원 참여 현황'</strong> 데이터를 자동으로 추출하세요.
                        </p>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {
                            captureController.isRecording ?
                            <button className="flex items-center gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm 2xl:text-base transition-all shadow-sm shadow-red-500/30"
                                onClick={() => captureController.stopCapture()}>
                                <span className="material-symbols-outlined text-[18px] 2xl:text-[20px]">stop_circle</span>
                                화면 캡쳐 중지
                            </button>
                            :
                            <button className="flex items-center gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium text-sm 2xl:text-base transition-all shadow-sm shadow-primary/30"
                                onClick={() => captureController.startCapture()}>
                                <span className="material-symbols-outlined text-[18px] 2xl:text-[20px]">videocam</span>
                                화면 캡쳐 시작
                            </button>
                        }
                        <button className="flex items-center gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-sm 2xl:text-base transition-all"
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
                                    console.warn("클립보드 읽기 실패:", err);
                                    alert("클립보드 접근 권한이 거부되었거나 지원하지 않는 환경입니다.");
                                }
                            }}>
                            <span className="material-symbols-outlined text-[18px] 2xl:text-[20px]">content_paste</span>
                            이미지 붙여넣기
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium text-sm 2xl:text-base transition-all"
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
                            <span className="material-symbols-outlined text-[18px] 2xl:text-[20px]">upload_file</span>
                            파일 선택
                        </button>
                    </div>
                </div>

                {/* 2. Instruction Guide Box */}
                <div className="p-4 md:p-5 2xl:p-6 bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-900/30 rounded-xl transition-all">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-sky-600 dark:text-sky-400 text-[20px] 2xl:text-[24px]">info</span>
                        <h3 className="font-semibold text-sky-800 dark:text-sky-300 text-sm 2xl:text-base">실시간 화면 캡쳐 가이드</h3>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm 2xl:text-base text-sky-700 dark:text-sky-400/90">
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-[16px] 2xl:text-[18px] mt-0.5 opacity-70">desktop_windows</span>
                            <span>공유 대상은 반드시 <strong>메이플스토리 창</strong>으로 지정해 주세요.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-[16px] 2xl:text-[18px] mt-0.5 opacity-70">mouse</span>
                            <span>마우스 커서가 <strong>닉네임이나 점수</strong>를 가리지 않게 주의해주세요.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-[16px] 2xl:text-[18px] mt-0.5 opacity-70">swipe_down</span>
                            <span>데이터가 기록되는 것을 확인하며 <strong>천천히 스크롤</strong>해 주세요.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-[16px] 2xl:text-[18px] mt-0.5 opacity-70">stop_circle</span>
                            <span>인식이 모두 완료되면 <strong>공유 중지</strong> 버튼을 눌러 종료하세요.</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            {/* Secondary Actions */}
            <div className="flex items-center gap-4 py-4 border-t border-border-light dark:border-border-dark">
                <span className="text-xs 2xl:text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Data Action</span>
                <button
                    className="flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-lg text-sm 2xl:text-base font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors"
                    onClick={() => { setRecords(() => []); }} >
                    <span className="material-symbols-outlined text-[16px] 2xl:text-[18px]">restart_alt</span>
                    기록 초기화
                </button>
                <button
                    className="flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-lg text-sm 2xl:text-base font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors"
                    onClick={() => { exportToExcel(records); }} >
                    <span className="material-symbols-outlined text-[16px] 2xl:text-[18px]">download</span>
                    XLSX로 내보내기
                </button>
            </div>
            
            {/* Data Table */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden flex flex-col">
                {/* [변경 3] px 대신 vh(Viewport Height)를 사용하여 모니터 크기에 비례하여 표 높이가 늘어나도록 수정 */}
                <div className="overflow-x-auto overflow-y-auto scrollbar-hide min-h-[300px] max-h-[55vh] 2xl:max-h-[70vh]">
                    <table className="w-full text-left border-collapse relative">
                        <thead>
                            <tr className="border-b border-border-light dark:border-border-dark">
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 2xl:py-5 text-xs 2xl:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-24">
                                    번호
                                </th>
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 2xl:py-5 text-xs 2xl:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    이름
                                </th>
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 2xl:py-5 text-xs 2xl:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                    주간미션
                                </th>
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 2xl:py-5 text-xs 2xl:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                    지하수로
                                </th>
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 2xl:py-5 text-xs 2xl:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                                    플래그레이스
                                </th>
                                <th className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800 px-6 py-4 2xl:py-5 w-12">
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light dark:divide-border-dark text-slate-700 dark:text-slate-300">
                            {records.map((record, index) => (
                                <tr key={index} className="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <td className="px-6 py-4 2xl:py-5 text-sm 2xl:text-base font-medium text-slate-900 dark:text-white">
                                        {(index + 1).toString().padStart(3, '0')}
                                    </td>
                                    <td className="px-6 py-4 2xl:py-5 text-sm 2xl:text-base">
                                        <div className="flex items-center gap-3">
                                            <span>{record.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 2xl:py-5 text-sm 2xl:text-base text-right font-mono text-sky-600 dark:text-sky-400">
                                        {record.week.toLocaleString('ko-KR')}
                                    </td>
                                    <td className="px-6 py-4 2xl:py-5 text-sm 2xl:text-base text-right font-mono text-teal-600 dark:text-teal-400">
                                        {record.culv.toLocaleString('ko-KR')}
                                    </td>
                                    <td className="px-6 py-4 2xl:py-5 text-sm 2xl:text-base text-right font-mono text-violet-600 dark:text-violet-400">
                                        {record.flag.toLocaleString('ko-KR')}
                                    </td>
                                    <td className="px-6 py-4 2xl:py-5 text-right">
                                        <button className="opacity-0 group-hover:opacity-100 w-7 h-7 2xl:w-8 2xl:h-8 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-all text-slate-400"
                                            onClick={() => { setRecords((prevRecords) => [...prevRecords.slice(0, index), ...prevRecords.slice(index + 1)]); }} >
                                            <span className="material-symbols-outlined text-[18px] 2xl:text-[20px]">close</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Footer */}
                <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 2xl:py-4 border-t border-border-light dark:border-border-dark flex items-center justify-between">
                    <span className="text-xs 2xl:text-sm text-slate-500 dark:text-slate-400">Showing {records.length} records</span>
                </div>
            </div>
        </div>
    </main>
  );
}
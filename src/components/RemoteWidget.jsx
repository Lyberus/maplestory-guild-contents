import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function RemoteWidget({ records, setRecords }) {
  const [pipWindow, setPipWindow] = useState(null);
  const [pipContainer, setPipContainer] = useState(null);

  const openPip = async () => {
    if (pipWindow || !('documentPictureInPicture' in window)) return;

    try {
      const pipWin = await window.documentPictureInPicture.requestWindow({
        width: 256,
        height: 310, 
      });

      // 기존 화면의 스타일시트를 PIP 창으로 복사
      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
          const style = document.createElement('style');
          style.textContent = cssRules;
          pipWin.document.head.appendChild(style);
        } catch {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = styleSheet.type;
          link.media = styleSheet.media;
          link.href = styleSheet.href;
          pipWin.document.head.appendChild(link);
        }
      });

      // 2. 핵심 해결책: PIP 창 자체의 html과 body 태그 배경색을 다크모드에 동기화하고, 기본 여백(margin)을 날려버립니다.
      pipWin.document.documentElement.className = document.documentElement.className;
      pipWin.document.body.className = "m-0 p-0 bg-surface-light dark:bg-surface-dark overflow-hidden";

      const container = document.createElement('div');
      // 컨테이너가 창 전체를 꽉 채우도록 w-full h-full 부여
      container.className = "w-full h-full flex flex-col";
      pipWin.document.body.appendChild(container);
      
      setPipWindow(pipWin);
      setPipContainer(container);

      pipWin.addEventListener('pagehide', () => {
        setPipWindow(null);
        setPipContainer(null);
      });

    } catch (error) {
      console.error('PIP 열기 실패:', error);
    }
  };

  const closePip = () => {
    if (pipWindow) pipWindow.close();
  };

  const isPip = !!pipWindow;

  const WidgetContent = (
    <div className={`flex flex-col bg-surface-light dark:bg-surface-dark overflow-hidden ${
      isPip 
        ? 'w-full h-full rounded-none border-none shadow-none ring-0' 
        : 'w-64 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-border-light dark:border-border-dark ring-1 ring-slate-900/5'
    }`}>
      
      {/* Widget Header */}
      <div className="bg-primary px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-white">
          <span className="material-symbols-outlined text-[18px]">settings_remote</span>
          <span className="text-xs font-bold uppercase tracking-wider">Remote</span>
        </div>
        <button 
          onClick={isPip ? closePip : undefined} 
          className="text-white/70 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
      
      {/* Widget Body */}
      <div className="p-4 flex flex-col gap-4 flex-1">
        <div className="flex flex-col items-center justify-center py-2">
          <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-semibold tracking-wider">Processed Data</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{records.length}</span>
            <span className="text-xs text-slate-500 font-medium">records</span>
          </div>
        </div>
        
        <div className="h-px bg-border-light dark:bg-border-dark w-full"></div>
        
        <div className="flex flex-col gap-2">
          <button 
            onClick={isPip ? closePip : openPip}
            className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
               {isPip ? 'close_fullscreen' : 'picture_in_picture_alt'}
            </span>
            {isPip ? 'Close PIP Mode' : 'Toggle PIP Mode'}
          </button>
          
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button className="flex items-center justify-center gap-1 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg text-xs font-bold transition-colors">
              <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              Start
            </button>
            <button className="flex items-center justify-center gap-1 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-xs font-bold transition-colors">
              <span className="material-symbols-outlined text-[16px]">stop</span>
              Stop
            </button>
          </div>
          <button className="flex items-center justify-center gap-2 w-full py-2 mt-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg text-xs font-medium transition-colors"
            onClick={() => { setRecords(() => []); }} >
            <span className="material-symbols-outlined text-[16px]">replay</span>
            Reset
          </button>
        </div>
      </div>
    </div>
  );

  if (isPip && pipContainer) {
    return createPortal(WidgetContent, pipContainer);
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
       {WidgetContent}
    </div>
  );
}
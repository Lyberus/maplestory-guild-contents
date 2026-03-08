import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import MainDashboard from './components/MainDashboard';
import RemoteWidget from './components/RemoteWidget';
import useScreenCapture from './utils/useScreenCapture';
import useFrameExtractor from './utils/useFrameExtractor';

function App() {
  // 다크모드
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const [records, setRecords] = useState([]);

  const [stream, setStream] = useState(null);
  const workerRef = useRef(null);
  const [isWorkerReady, setIsWorkerReady] = useState(false);

  // For Debug
  const debugCanvasRef = useRef(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('./utils/opencv.worker.js', import.meta.url));
    workerRef.current.onmessage = async (e) => {
      if (e.data.type === 'READY') {
        setIsWorkerReady(true);
      }
      else if (e.data.type === 'RESULT') {
        const analyzedData = e.data.payload;

        if (analyzedData) setRecords((prev) => {
          const map = new Map();
          [...prev, ...analyzedData].forEach(item => { map.set(item.name, item); });
          return Array.from(map.values());
        });
      }
      else if (e.data.type === 'DEBUG') {
          const imgData = e.data.payload;
          const canvas = debugCanvasRef.current;
          if (canvas) {
            canvas.width = imgData.width;
            canvas.height = imgData.height;
            const ctx = canvas.getContext('2d');
            ctx.putImageData(imgData, 0, 0);
          }
      }
    };

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  const handleStreamReady = (newStream) => {
      setStream(newStream);
  };
  const captureController = useScreenCapture({ onStreamReady: handleStreamReady });

  useEffect(() => {
    if (!captureController.isRecording) setStream(null);
  }, [captureController.isRecording]);

  useFrameExtractor(stream, workerRef, 100);

  const processManualImage = async (fileOrBlob) => {
    if (!workerRef.current || !fileOrBlob) return;

    try {
      const bitmap = await createImageBitmap(fileOrBlob);
      workerRef.current.postMessage({ type: 'PROCESS_IMAGE', payload: bitmap, source: 'MANUAL' }, [bitmap]);
    }
    catch (err) {
      console.error("수동 이미지 전송 실패:", err);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col relative overflow-hidden">
      {!isWorkerReady && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm">
          <div className="w-12 h-12 mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            로딩 중...
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            네트워크 상태에 따라 몇 초 정도 소요될 수 있습니다.
          </p>
        </div>
      )}

      {/*
      <div className="absolute top-20 right-4 z-40 bg-white dark:bg-slate-800 p-2 rounded shadow-lg border border-slate-300 dark:border-slate-600">
        <h3 className="text-xs font-bold text-red-500 mb-1">🛠️ Debug View</h3>
        <canvas 
          ref={debugCanvasRef} 
          className="bg-black max-w-[400px] h-auto rounded"
        />
      </div>
      */}

      <Header isDark={isDark} setIsDark={setIsDark} />
      <MainDashboard captureController={captureController} processManualImage={processManualImage} records={records} setRecords={setRecords} />
      {captureController.isRecording && <RemoteWidget isDark={isDark} captureController={captureController} records={records} setRecords={setRecords} />}
    </div>
  );
}

export default App;
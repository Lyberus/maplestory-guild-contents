import { useEffect, useRef } from 'react';

export default function useFrameExtractor(stream, workerRef, intervalMs = 100) {
    const videoRef = useRef(null);
    const isProcessingRef = useRef(false);
    const timeoutIdRef = useRef(null);

    useEffect(() => {
        if (!stream || !workerRef.current) {
            isProcessingRef.current = false;
            return;
        }

        isProcessingRef.current = false;
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.muted = true;
        videoRef.current = video;

        const sendFrameToWorker = async () => {
            if (isProcessingRef.current || video.readyState < 2) {
                timeoutIdRef.current = setTimeout(sendFrameToWorker, intervalMs);
                return;
            }

            try {
                isProcessingRef.current = true;

                const bitmap = await createImageBitmap(video);
                workerRef.current.postMessage({
                    type: 'PROCESS_IMAGE',
                    payload: bitmap,
                    source: 'STREAM'
                }, [bitmap]);
            }
            catch (err) {
                console.error("프레임 추출 오류:", err);
                isProcessingRef.current = false;
                timeoutIdRef.current = setTimeout(sendFrameToWorker, intervalMs);
            }
        };

        video.onloadedmetadata = () => {
            video.play();
            sendFrameToWorker();
        };

        const handleWorkerMessage = (e) => {
            if (e.data.type === 'RESULT' && e.data.source === 'STREAM') {
                isProcessingRef.current = false;
                timeoutIdRef.current = setTimeout(sendFrameToWorker, intervalMs);
            }
        };
        workerRef.current.addEventListener('message', handleWorkerMessage);

        return () => {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
            video.srcObject = null;
            workerRef.current.removeEventListener('message', handleWorkerMessage);
        };
    }, [stream, workerRef, intervalMs]);
};
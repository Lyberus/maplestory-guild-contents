import { useState, useRef, useCallback, useEffect } from "react";

export default function useScreenCapture({ onStreamReady }) {
    const [isRecording, setIsRecording] = useState(false);
    const streamRef = useRef(null);

    const startCapture = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "never" }, audio: false });
            streamRef.current = stream;
            setIsRecording(true);

            if (onStreamReady) onStreamReady(stream);

            stream.getVideoTracks()[0].onended = () => {
                stopCapture();
            };
        } catch (error) {
            console.error("화면 캡쳐 취소 또는 실프:", error);
        }
    }, [onStreamReady]);

    const stopCapture = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setIsRecording(false);
    }, []);

    useEffect(() => {
        return () => {
            if (streamRef.current)
                streamRef.current.getTracks().forEach((track) => track.stop());
        };
    }, []);

    return { isRecording, startCapture, stopCapture };
}
self.importScripts('/opencv.js');

let isCvReady = false;

cv['onRuntimeInitialized'] = () => {
    isCvReady = true;
    self.postMessage({ type: 'READY' });
};

self.onmessage = function(e) {
    const { type, payload, source } = e.data;

    if (type === 'PROCESS_IMAGE') {
        if (!isCvReady) {
            console.warn("OpenCV가 아직 로딩되지 않았습니다.");
            if (payload && typeof payload.close === 'function') payload.close();
            return;
        }

        const res = processImage(payload);
        self.postMessage({ type: 'RESULT', payload: res, source: source });
    }
};

function processImage(imageBitmap) {
    const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let src = cv.matFromImageData(imageData);
    let dst = new cv.Mat();
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);

    // 추가 처리 ㅁㄴㅇㄹ TODO

    src.delete();
    dst.delete();

    return [];
}
const public_path = '/maplestory-guild-contents'

self.importScripts(`${public_path}/opencv.js`);

let isCvReady = false;

let patterns = {};
let templateMat = null;
let resultMat = null;

let tempMat1 = null;
let tempMat2 = null;
let dst = null;
let sharpenKernel = null;
let lutMat = null;
const threshold_val = 220;

let OCR_Trie = null;

cv['onRuntimeInitialized'] = async () => {
    tempMat1 = new cv.Mat();
    tempMat2 = new cv.Mat();
    resultMat = new cv.Mat();
    dst = new cv.Mat();

    sharpenKernel = cv.matFromArray(3, 3, cv.CV_32FC1, [
        -0.25, -1.0, -0.25,
        -1.0,  6.0, -1.0,
        -0.25, -1.0, -0.25
    ]);

    const gamma = 1.5;
    lutMat = new cv.Mat(1, 256, cv.CV_8UC1);
    const lutArray = new Uint8Array(256);
    for (let i = 0; i < 256; i++)
        lutArray[i] = Math.round(Math.min(255, Math.pow(i / 255.0, gamma) * 255.0));
    lutMat.data.set(lutArray);

    const ocr_raw = await fetch(`${public_path}/ocr.json`);
    const src = await ocr_raw.text();
    const result = JSON.parse(src, (key, value) => {
        if (key === 'next') {
            const ret = new Map();
            for (const property in value)
                ret.set(parseInt(property), value[property]);
            return ret;
        }
        return value;
    });
    OCR_Trie = result;

    try {
        const response = await fetch(`${public_path}/anchor.png`); 
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);

        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(bitmap, 0, 0);

        let rgbaMat = cv.matFromImageData(ctx.getImageData(0, 0, bitmap.width, bitmap.height));
        
        templateMat = new cv.Mat();
        cv.cvtColor(rgbaMat, templateMat, cv.COLOR_RGBA2GRAY);

        rgbaMat.delete();
        bitmap.close();

    } catch (err) {
        console.error("워커 템플릿 이미지 로드 실패:", err);
    }

    for (const kind of ['1366x768', '1920x1080', '1920x1200', '2560x1440', '2560x1600', '2732x1536', '3840x2160']) {
        try {
            const response = await fetch(`${public_path}/${kind}.png`); 
            const blob = await response.blob();
            const bitmap = await createImageBitmap(blob);

            const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(bitmap, 0, 0);

            let rgbaMat = cv.matFromImageData(ctx.getImageData(0, 0, bitmap.width, bitmap.height));
            
            patterns[kind] = new cv.Mat();
            cv.cvtColor(rgbaMat, patterns[kind], cv.COLOR_RGBA2GRAY);

            rgbaMat.delete();
            bitmap.close();

        } catch (err) {
            console.error("워커 템플릿 이미지 로드 실패:", err);
        }
    }

    isCvReady = true;
    self.postMessage({ type: 'READY' });
};

self.onmessage = function(e) {
    const { type, payload, source } = e.data;

    if (!isCvReady) {
        console.warn("OpenCV가 아직 로딩되지 않았습니다.");
        if (payload && typeof payload.close === 'function') payload.close();
        return;
    }

    if (type === 'PROCESS_IMAGE') {
        const res = processImage(payload);
        self.postMessage({ type: 'RESULT', payload: res, source: source });
    }
};

function toClientSize(boundWidth, boundHeight) {
    const candidates = [
        { w: 3840, h: 2160 }, // 4K
        { w: 2732, h: 1536 },
        { w: 2560, h: 1600 },
        { w: 2560, h: 1440 }, // QHD
        { w: 1920, h: 1200 },
        { w: 1920, h: 1080 }, // FHD
        { w: 1366, h: 768 }   // HD
    ];

    const possible = candidates.filter(c => c.w <= boundWidth && c.h <= boundHeight);
    if (possible.length === 0)
        return null;
    return possible[0];
}

function findPattern(screen, kind) {
    if (!(kind in patterns)) return false;
    let resMat = null;
    try {
        resMat = new cv.Mat();
        cv.matchTemplate(screen, patterns[kind], resMat, cv.TM_CCOEFF_NORMED);

        let res = cv.minMaxLoc(resMat);
        let maxVal = res.maxVal;

        return Boolean(maxVal > 0.8)
    }
    finally {
        if (resMat) resMat.delete();
    }
}

function processImage(imageBitmap) {
    const clientSize = toClientSize(imageBitmap.width, imageBitmap.height);
    if (!clientSize) {
        console.warn("지원하지 않는 해상도입니다.");
        return [];
    }
    const side = (imageBitmap.width - clientSize.w) / 2;
    const top = (imageBitmap.height - clientSize.h - side);

    const canvas = new OffscreenCanvas(clientSize.w, clientSize.h);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(imageBitmap, side, top, clientSize.w, clientSize.h, 0, 0, clientSize.w, clientSize.h);
    const imageData = ctx.getImageData(0, 0, clientSize.w, clientSize.h);
    
    let src = cv.matFromImageData(imageData);
    let roi = null;

    try {
        if (!templateMat || templateMat.empty()) return [];

        cv.cvtColor(src, tempMat1, cv.COLOR_RGBA2GRAY);

        let dsize = null;
        if (clientSize.h === 768) {
            if (findPattern(tempMat1, '1366x768'))
                dsize = new cv.Size(1366, 768);
            else
                return [];
        }
        else if (clientSize.h === 1080) {
            if (findPattern(tempMat1, '1920x1080'))
                dsize = new cv.Size(1366, 768);
            else if (findPattern(tempMat1, '1366x768'))
                dsize = new cv.Size(1920, 1080);
            else
                return [];
        }
        else if (clientSize.h === 1200) {
            if (findPattern(tempMat1, '1920x1200'))
                dsize = new cv.Size(1230, 768);
            else if (findPattern(tempMat1, '1366x768'))
                dsize = new cv.Size(1920, 1200);
            else
                return [];
        }
        else if (clientSize.h === 1440) {
            if (findPattern(tempMat1, '2560x1440'))
                dsize = new cv.Size(1366, 768);
            else if (findPattern(tempMat1, '2732x1536'))
                dsize = new cv.Size(1280, 720);
            else
                return [];
        }
        else if (clientSize.h === 1536) {
            if (findPattern(tempMat1, '2732x1536'))
                dsize = new cv.Size(1366, 768);
            else
                return [];
        }
        else if (clientSize.h === 1600) {
            if (findPattern(tempMat1, '2560x1600'))
                dsize = new cv.Size(1230, 768);
            else if (findPattern(tempMat1, '2732x1536'))
                dsize = new cv.Size(1280, 800);
            else
                return [];
        }
        else if (clientSize.h === 2160) {
            if (findPattern(tempMat1, '3840x2160'))
                dsize = new cv.Size(1366, 768);
            else if (findPattern(tempMat1, '2732x1536'))
                dsize = new cv.Size(1920, 1080);
            else
                return [];
        }
        else
            return [];
        if (!dsize) return [];
        cv.resize(tempMat1, tempMat2, dsize, 0, 0, cv.INTER_AREA);
        cv.matchTemplate(tempMat2, templateMat, resultMat, cv.TM_CCOEFF_NORMED);
        let result = cv.minMaxLoc(resultMat);
        let maxPoint = result.maxLoc;
        let maxVal = result.maxVal;

        if (maxVal < 0.8) return [];

        let anchor = { x: maxPoint.x, y: maxPoint.y };
        let rect = new cv.Rect(anchor.x, anchor.y, 480, 450);
        if (rect.x + rect.width > tempMat2.cols || rect.y + rect.height > tempMat2.rows) return [];
        roi = tempMat2.roi(rect);

        cv.filter2D(roi, tempMat1, cv.CV_8U, sharpenKernel);
        cv.LUT(tempMat1, lutMat, tempMat2);
        cv.threshold(tempMat2, dst, threshold_val, 255, cv.THRESH_BINARY);

        const res = [];
        for (let i = 0; i < 17; i++) {
            const yoff = i * 24 + 43;
            let nameRoi = dst.roi(new cv.Rect(39, yoff, 65, 12));
            let name = runTrieOCR(nameRoi);
            let weekRoi = dst.roi(new cv.Rect(299, yoff, 20, 12));
            let week = runTrieOCR(weekRoi);
            let culvRoi = dst.roi(new cv.Rect(340, yoff, 70, 12));
            let culv = runTrieOCR(culvRoi);
            let flagRoi = dst.roi(new cv.Rect(434, yoff, 35, 12));
            let flag = runTrieOCR(flagRoi);

            nameRoi.delete();
            weekRoi.delete();
            culvRoi.delete();
            flagRoi.delete();

            if (name && week && culv && flag) {
                res.push({ name, week: parseInt(week.replaceAll(',', '')), culv: parseInt(culv.replaceAll(',', '')), flag: parseInt(flag.replaceAll(',', '')) });
            }
        }

        return res;
    }
    finally {
        if (src !== null) src.delete();
        if (roi !== null) roi.delete();
        if (imageBitmap && typeof imageBitmap.close === 'function') {
            imageBitmap.close(); 
        }
    }
}

function runTrieOCR(mat) {
    const channels = mat.channels();
    let curr = OCR_Trie;
    let resultText = '';
    let ptrs = [];
    for (let y = 0; y < 12; y++)
        ptrs.push(mat.ptr(y));
    for (let x = 0; x < mat.cols * channels; x += channels) {
        let columnBits = 0;
        for (let y = 0; y < 12; y++) {
            const bin = ptrs[y][x] === 255 ? 1 : 0;
            columnBits |= bin << y;
        }

        if (curr.next.has(columnBits)) {
            curr = curr.next.get(columnBits);
        } else if (columnBits === 0) {
            if (curr.output) resultText += curr.output;
            else if (curr !== OCR_Trie) return null;
            curr = OCR_Trie;
        } else {
            return null;
        }
    }
    return resultText;
}

function sendImageForDebug(mat) {
    let debugMat = new cv.Mat();
    cv.cvtColor(mat, debugMat, cv.COLOR_GRAY2RGBA);
    const imgData = new ImageData(
        new Uint8ClampedArray(debugMat.data), 
        debugMat.cols, 
        debugMat.rows
    );
    self.postMessage({ type: 'DEBUG', payload: imgData });
    debugMat.delete();
}
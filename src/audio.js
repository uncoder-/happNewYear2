let faked = true;
if (!window.AudioContext && window.webkitAudioContext) {
    window.AudioContext = window.webkitAudioContext;
    faked = false;
}
const audioCtx = new AudioContext();

export async function initAudio(url) {
    return await fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HTTP error, status = ' + response.status);
            }
            return response.arrayBuffer();
        })
        .then(function(buffer) {
            if (audioCtx.decodeAudioData.length === 2) {
                // Safari
                // hack, hack!
                return new Promise(resolve => {
                    audioCtx.decodeAudioData(buffer, buffer => {
                        resolve(buffer);
                    });
                });
            } else {
                // not Safari
                return audioCtx.decodeAudioData(buffer);
            }
        });
}

export function play(audioData) {
    if (!faked) {
        faked = true;
        const buffer = audioCtx.createBuffer(1, 1, audioCtx.sampleRate);
        const sample = audioCtx.createBufferSource();
        sample.buffer = buffer;
        sample.connect(audioCtx.destination);
        sample.start();
    }
    const source = audioCtx.createBufferSource();
    source.buffer = audioData;
    // 控制声音
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.75; // 10 %
    gainNode.connect(audioCtx.destination);
    source.connect(gainNode);
    source.start(0);
}

export function stop(source) {
    source.stop(0);
}

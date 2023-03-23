var video, reqBtn, startBtn, stopBtn, ul, stream, recorder;
video = document.getElementById('leftVideo');

startBtn = document.getElementById('start');
stopBtn = document.getElementById('stop');
uploadBtn = document.getElementById('upload');






function requestVideo() {
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        .then(stm => {
            stream = stm;
            reqBtn.style.display = 'none';
            startBtn.removeAttribute('disabled');
            video.src = URL.createObjectURL(stream);
        }).catch(e => console.error(e));
}

function startRecording() {
    recorder = new MediaRecorder(stream, {
        mimeType: 'video/mp4'
    });
    recorder.start();
    stopBtn.removeAttribute('disabled');
    startBtn.disabled = true;
}


function stopRecording() {
    recorder.ondataavailable = e => {
        ul.style.display = 'block';
        var a = document.createElement('a'),
            li = document.createElement('li');
        a.download = ['video_', (new Date() + '').slice(4, 28), '.webm'].join('');
        a.href = URL.createObjectURL(e.data);
        a.textContent = a.download;
        li.appendChild(a);
        ul.appendChild(li);
    };
    recorder.stop();
    startBtn.removeAttribute('disabled');
    stopBtn.disabled = true;
}
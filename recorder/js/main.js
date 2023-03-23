/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */


const leftVideo = document.getElementById('leftVideo');
const rightVideo = document.getElementById('rightVideo');


document.getElementById('reqBtn').onclick = function() {
    document.getElementById('btn-stop-recording').disabled = false;
    playVideo(function() {
        leftVideo.addEventListener('canplay', () => {
            let stream;
            const fps = 30;
            if (leftVideo.captureStream) {
                stream = leftVideo.captureStream(fps);
            } else if (leftVideo.mozCaptureStream) {
                stream = leftVideo.mozCaptureStream(fps);
            } else {
                console.error('Stream capture is not supported');
                stream = null;
            }
            rightVideo.srcObject = stream;
        });

        document.getElementById('btn-stop-recording').disabled = false;
    }, 1000);
};


function querySelectorAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
}

document.getElementById('btn-stop-recording').onclick = function() {
        this.disabled = true;

        isStoppedRecording = true;


        var videoElement = document.getElementById('leftVideo');

        function playVideo(callback) {
            function successCallback(stream) {
                videoElement.stream = stream;
                videoElement.onloadedmetadata = function() {
                    callback();
                };
                videoElement.srcObject = stream;
            }

            function errorCallback(error) {
                console.error('get-user-media error', error);
                callback();
            }
        }

        document.getElementById('leftVideo', gotVideo);
        var streamRecorder;

        function gotVideo(stream) {
            streamRecorder = stream.record();
        }

        function stopRecording() {
            streamRecorder.getRecordedData(gotData);
        }

        function gotData(blob) {
            var x = new XMLHttpRequest();
            x.open('POST', 'uploadMessage');
            x.send(blob);
        }

        var button = this;

        function uploadToPHPServer(fileName, recordRTC, callback) {


            blob = new File([blob], getFileName(fileExtension), {
                type: 'video/mp4'
            });

            // create FormData
            var formData = new FormData();

            formData.append('file', blob);
            formData.append('api_key', '38097c1iu68fp4xubgz5r');


            callback('Uploading recorded-file to server.');

            var upload_url = 'https://io274l.dood.video/upload/01?38097c1iu68fp4xubgz5r';


            makeXMLHttpRequest(upload_url, formData, function(progress) {
                if (progress !== 'upload-ended') {
                    callback(progress);
                    return;
                }

                callback('ended', upload_directory + fileName);
            });
        }

        function makeXMLHttpRequest(url, data, callback) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {
                    if (request.responseText === 'success') {
                        callback('upload-ended');
                        return;
                    }

                    document.querySelector('.header').parentNode.style = 'text-align: left; size: 12; font: arial; color: red; padding: 5px 10px;';
                    document.querySelector('.header').parentNode.innerHTML = request.responseText;
                }
            };

            request.upload.onloadstart = function() {
                callback('Upload started...');
            };

            request.upload.onprogress = function(event) {
                callback('Upload Progress ' + Math.round(event.loaded / event.total * 100) + "%");
            };

            request.upload.onload = function() {
                callback('progress-about-to-end');
            };

            request.upload.onload = function() {
                callback('Getting File URL..');
            };

            request.upload.onerror = function(error) {
                callback('Failed to upload to server');
            };

            request.upload.onabort = function(error) {
                callback('Upload aborted.');
            };

            request.open('POST', url);
            request.send(data);
        }

        function getRandomString() {
            if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
                var a = window.crypto.getRandomValues(new Uint32Array(3)),
                    token = '';
                for (var i = 0, l = a.length; i < l; i++) {
                    token += a[i].toString(36);
                }
                return token;
            } else {
                return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
            }
        }

        function getFileName(fileExtension) {
            var d = new Date();
            var year = d.getUTCFullYear();
            var month = d.getUTCMonth();
            var date = d.getUTCDate();
            return 'RecordRTC-' + year + month + date + '-' + getRandomString() + '.' + fileExtension;
        }

        function SaveFileURLToDisk(fileUrl, fileName) {
            var hyperlink = document.createElement('a');
            hyperlink.href = fileUrl;
            hyperlink.target = '_blank';
            hyperlink.download = fileName || fileUrl;

            (document.body || document.documentElement).appendChild(hyperlink);
            hyperlink.onclick = function() {
                (document.body || document.documentElement).removeChild(hyperlink);

                // required for Firefox
                window.URL.revokeObjectURL(hyperlink.href);
            };

            var mouseEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });

            hyperlink.dispatchEvent(mouseEvent);
        }

        function getURL(arg) {
            var url = arg;

            if (arg instanceof Blob || arg instanceof File) {
                url = URL.createObjectURL(arg);
            }

            if (arg instanceof RecordRTC || arg.getBlob) {
                url = URL.createObjectURL(arg.getBlob());
            }

            if (arg instanceof MediaStream || arg.getTracks) {
                // url = URL.createObjectURL(arg);
            }

            return url;
        }

        function setVideoURL(arg, forceNonImage) {
            var url = getURL(arg);

            var parentNode = recordingPlayer.parentNode;
            parentNode.removeChild(recordingPlayer);
            parentNode.innerHTML = '';

            var elem = 'video';
            if (type == 'gif' && !forceNonImage) {
                elem = 'img';
            }
            if (type == 'audio') {
                elem = 'audio';
            }

            recordingPlayer = document.createElement(elem);

            if (arg instanceof MediaStream) {
                recordingPlayer.muted = true;
            }

            recordingPlayer.addEventListener('loadedmetadata', function() {
                if (navigator.userAgent.toLowerCase().indexOf('android') == -1) return;

                // android
                setTimeout(function() {
                    if (typeof recordingPlayer.play === 'function') {
                        recordingPlayer.play();
                    }
                }, 2000);
            }, false);

            recordingPlayer.poster = '';

            if (arg instanceof MediaStream) {
                recordingPlayer.srcObject = arg;
            } else {
                recordingPlayer.src = url;
            }

            if (typeof recordingPlayer.play === 'function') {
                recordingPlayer.play();
            }

            recordingPlayer.addEventListener('ended', function() {
                url = getURL(arg);

                if (arg instanceof MediaStream) {
                    recordingPlayer.srcObject = arg;
                } else {
                    recordingPlayer.src = url;
                }
            });

            parentNode.appendChild(recordingPlayer);
        }
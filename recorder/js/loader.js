const data = null;
window.onload = function() {
const xhr = new XMLHttpRequest();
xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState == 4 && this.status == 200) {
                        var data = JSON.parse(this.responseText);
                        for(let i = 0; i < 200; i++) {
                document.getElementById("video").src = data.models[i].stream.url;
        
         
                        }
           
        
            }
            
            console.log(JSON.parse(JSON.stringify((data))))
            });
        
        };
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            this.videoSrc = "https://b-hls-16.doppiocdn.com/hls/60700461/master/60700461.m3u8";
        }
            
        
xhr.open("GET", "https://go.xxxiijmp.com/api/models?%24%7B%22Get%2010%20video%20url%22)=%22Get%20json%22.%22response%22.%22body%22.%22models%22.%222%22.%22stream%22.%22url%22%7D&gender=female")
            
xhr.send(data)

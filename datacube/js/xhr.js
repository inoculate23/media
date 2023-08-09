			window.onload = function() {
    const xhr = new XMLHttpRequest();

    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var data = JSON.parse(this.responseText);
        console.log(data); 
  
               for (let i = 1; i < 200; i++) {
                 
               //const iframe = document.createElement('iframe')
			 //  iframe.src =  data.results[i].iframe_embed;
               

                   const details = document.createElement('img');
                 details.setAttribute('src', data.results[i].image_url);

				 details.setAttribute('id', 'img'[i]);
                 //   details.setAttribute('class','thumb');
                   
                   // const link = document.createElement('a');
                    
                 // link.setAttribute('href', 'http://127.0.0.1:5501/api_4.html?src=https://edge18-lax.live.mmcdn.com/live-hls/amlst:' + data.results[i].username + '/playlist.m3u8');
				 // link.setAttribute('target', '_self');
                  // link.setAttribute("class", 'element');
				//  const element = document.createElement('div');
				//  element.setAttribute = ('class', 'element');
					

				
			
					
				 // details.setAttribute = ('class','image_url');
				

//var container = document.getElementById('header1');
//container.appendChild(element);
                //container.append(link);
				//element.append(details);
                   
              //    };
                 //   }
                    
              
      
             

				

					
					const element = document.createElement( 'div' );
					element.className = 'element';
					element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

				
			
					
					details.className = 'image_url';
					//details.src = table[ i ];
					element.appendChild( details );
					console.log(element)
					console.log(details)
				
			};
		}
	})

      xhr.open("GET", "https://chaturbate.com/api/public/affiliates/onlinerooms/?wm=aqAcE&client_ip=request_ip&limit=500&hd=true&gender=f&embed_video_only=1" );
      xhr.send();
	}
       
let yoff = 0.0; // 2nd dimension of simplex noise
let song, analyzer;
let mic, fft;


function setup() {
  createCanvas(1920, 1070, WEBGL);
  background(5,7, 4,6, 7.)
  fill('rgba(0,25,0, .045)');
  stroke(25);
}


function draw() {

 
  rotateY(PI / 6);
  stroke(200);
  box(35);
  let rad = millis() / 1000;
  // Set rotation angles
  let ct = cos(rad);
  let st = sin(rad);
  // Matrix for rotation around the Y axis
  applyMatrix( 
    ct, 0.0,  st,   0.0,
    0.0, 1.0, 0.0,  0.0,
    st, 0.0,  ct,  0.0,
    0.5, 1.0, 5.0,  1.0
  );

  box(50);
;
 
  beginShape();
// Option #1: 4D Noise
  let xoff = 10; 
  ambientLight(33);

  // add point light to showcase specular material
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(215, 65, 25, locX, locY, 1700.9060);
    // add point light to showcase specular material
  let locX2 = mouseX - width / 1;
  let locY2 = mouseY - height / 5;
 pointLight(5, 65, 205, locX, locY, 13700.9060 );
  specularMaterial(20);
  shininess(70);
  
  // let xoff = yoff; 
   // Option #2: 1D Noise





  
 
  


  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 2.900) {
    // Calculate a y value according to noise, map to

 
    // Option #1: 2D Noise
    let y = map(noise(xoff, yoff), 0, .06427, 20, 1);


    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 8.0035;
  }
  // increment y dimension for noise
  yoff += 0.011;
  vertex(width, height);
  vertex(1, height);
  endShape(CLOSE);
}

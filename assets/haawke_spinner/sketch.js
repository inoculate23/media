let shiny;
let fontBold;


function setup() {
  createCanvas(700, 360, WEBGL);
  frameRate(60);


  smooth();
 
   img2 = loadImage('logo.webp');



 img5=loadImage('5.jpeg');


}
function draw() {
  background(255);



  

  specularMaterial(150, 230, 250);
   

  
  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;


  pointLight(255, 33, 10, locX, locY, 200);
  rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.002);
    push();
  rotateZ(frameCount * 0.005);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.003);

  push()
  // Set the material
  
 specularMaterial(250, 200, 200, 200);

 ambientLight(10, 0,9)
   texture(img5);
   pointLight(25, 233, 210, locX, locY, 200);
    box(200, 200);
  shiny;
  smooth()
   pop()

  pop();

   ambientMaterial(150, 0, 57);
  texture(img2);
  textureMode(NORMAL);
  beginShape();
  vertex(-75, -75, 0, 0);
  vertex(75, 75, 4, 0);
  vertex(75, 75, 4, 4);
  vertex(-75, 75, 0, 4);
  endShape();

        ambientLight(25,15,00)

  directionalLight(255, 0, 200, 40.25, 70.25, 0);
      box(324, 320, 500);  
 push();
  strokeWeight(9);
  normalMaterial();


}






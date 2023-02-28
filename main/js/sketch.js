function setup() {
  createCanvas(1920, 1080, WEBGL);
  frameRate(60);
  smooth();
  
}
function draw() {
  normalMaterial();
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.03);
  
  strokeWeight(1);
  
  stroke('#ff7300');
  // polarPolygon( number, angle, radius, [distance] )
  polarPolygon(1, 0, 50);
  // polarPentagons( number, radius, distance, [callback] )
  polarPentagons(12, 30, 189);
  
  // polarTriangles( number, radius, distance, [callback] )
  stroke('#64ff00');
  polarTriangles(6, 525, 150);
  
  strokeWeight(1);
  stroke('#fc49ab');
  polarTriangles(10, 150, 150);
}
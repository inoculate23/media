let mic, fft;
let windowResized;
function setup() {
  createCanvas(710, 400);
  fill(23, 166, 199);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}
function setup() {
  createCanvas(1280, 250);
}



function draw() {
  background(31, 33, 36);


  let spectrum = fft.analyze();

  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 20, 205, height, 100));
  }
  endShape();
}

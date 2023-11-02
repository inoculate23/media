let mic, fft;

function setup() {
  createCanvas(1700, 245);
  fill(23, 166, 199);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(31, 33, 36);

  let spectrum = fft.analyze();

  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 10, 255, height, 100));
  }
  endShape();
}

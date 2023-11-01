let osc, envelope, fft;

let scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
let note = 0;

function setup() {
  createCanvas(800, 159);
  osc = new p5.SinOsc();

  // Instantiate the envelope
  envelope = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

  osc.start();

  fft = new p5.FFT();
  noStroke();
}

function draw() {
background(31, 33, 36);
  
noStroke();
  smooth;

  if (frameCount % 20 === 0 || frameCount === 1) {
    let midiValue = scaleArray[note];
    let freqValue = midiToFreq(midiValue);
    osc.freq(freqValue);

    envelope.play(osc, 0, 0.199);
    note = (note + 3) % scaleArray.length;
  }

  // plot FFT.analyze() frequency analysis on the canvas
  let spectrum = fft.analyze();
  for (let i = 1; i < spectrum.length / 2; i++) {
    fill(spectrum[i], spectrum[i] /1.5, );
    let x = map(i, 10, spectrum.length / 55, 150, width);
    let h = map(spectrum[i], 0, 255, 10, height);
    rect(x, height, spectrum.length / 40, -h);
  }
}

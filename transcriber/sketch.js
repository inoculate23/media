var myRec = new p5.SpeechRec(); // new P5.SpeechRec object


function setup() {
    // graphics stuff:
    createCanvas(1750, 620);
    background(255, 255, 255);
    fill(0, 0, 0, 255);
    // instructions:
    textSize(52);
    textAlign(CENTER);
    text("AI Transcription", width / 7, height / 7);
    textSize(32);
    textAlign(CENTER);
    text("say something, or transcribe lyrics, or a video call", width / 2, height / 2);
    myRec.onResult = showResult;
    myRec.start();
}

function draw() {
    // why draw when you can talk?
}


function showResult() {
    if (myRec.resultValue == true) {

        background(192, 175, 192);
        text(myRec.resultString, width / 2, height / 2);

        console.log(myRec.resultString);


    }
}
//for the #wccChallenge on the theme of "Electric Growth"  :|  --> code by Aaron Reuland
//OK... well... the theme... so... there is growth, right? Things are growing, clearly, I mean
//you see them growing across the canvas, right?
//and... well, those shapes were supposed to be sorta electric looking. But then
//you see, I changed a few parameters and they got prettier and more interesting looking...
//And well...
//I like them better. And so... here it is. 

//Radially symmetrical shapes created by using polar noise, drawing with low alpha over time to give
//that nice sketchy look. Placement is via my new cc bff, 'poisson disc sampling' (poisson funct tab),
//with objects (flake class tab) shrunk to fit and not overlap (fit funct tab).

let finished = []
let flakes = []
let m

function setup() {
    createCanvas(windowWidth, windowHeight);

    text(test)
    blendMode(EXCLUSION)
    background('#000000');
    m = min(width, height)

    poissonDiscSample(m / 3)
    fit(m / 40);

}

function draw() {

    for (let flake of flakes) {
        flake.create();
        flake.end();
    }

}

function poissonDiscSample(r) {
    //Code by Daniel Shiffman, as adapted by Aaron Reuland
    let active = []
    let positions = []
    var k = 32
    w = r / sqrt(2)
    cols = floor(width / w)
    rows = floor(height / w)
    for (let i = 0; i < cols * rows; i++) {
        positions[i] = undefined

    }

    var pos = createVector(random(width), random(height))
    let i = floor(pos.x / w)
    let j = floor(pos.y / w)
    positions[i + j * cols] = pos
    active.push(pos)


    while (active.length > 0) {
        let ranIndex = floor(random(active.length))
        var rpos = active[ranIndex]
        var found = false
        for (let n = 0; n < k; n++) {
            let sample = p5.Vector.random2D()
            let m = random(2, 2 * r)
            sample.setMag(m);
            sample.add(rpos)

            var col = floor(sample.x / w)
            var row = floor(sample.y / w)

            if (col > -1 && row > -1 && col < cols && row < rows && !positions[col + row * cols]) {

                var ok = true
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        var index = (col + i) + (row + j) * cols
                        let neighbor = positions[index]
                        if (neighbor) {
                            let d = p5.Vector.dist(sample, neighbor)
                            if (d < r) {
                                ok = false
                            }
                        }
                    }
                }
                if (ok) {
                    found = true
                    positions[col + row * cols] = sample;
                    active.push(sample)
                }
            }
        }
        if (!found) {
            active.splice(ranIndex, 1)
        }
    }

    for (let i = 0; i < positions.length; i++) {
        if (positions[i]) {
            finished.push(positions[i])
        }
    }

}

function fit(minSize) {
    shuffle(finished, true)
    let md = min(width, height)
    let x = 0
    let y = 0
    let s
    for (let i = 0; i < finished.length; i++) {
        x = finished[i].x;
        y = finished[i].y;

        s = random(md / 2, md / 3)

        for (let j = flakes.length - 1; j >= 0; j--) {


            if (dist(x, y, flakes[j].pos.x, flakes[j].pos.y) <= s / 3 + flakes[j].s / 3) {
                let cs = dist(x, y, flakes[j].pos.x, flakes[j].pos.y) - flakes[j].s / 3

                if (cs < s) {
                    s = cs
                }
            }
        }
        if (s >= minSize) {
            flakes.push(new flake(x, y, s * 1.0))
        }
    }

}
class flake {
    constructor(x, y, s) {
        this.pos = createVector(x, y)
        this.s = floor(s)
        this.count = -x
        this.framer = random(1900)
        this.fold = floor(random(200, 59))
        this.done = random(650, 600)
        this.noise = floor(random(1500))
        this.r = random(TAU)
        this.delay = x
    }

    create() {
        this.delay--
            if (this.delay < 0) {
                strokeWeight(this.s / 1250)
                let stroker = map(this.s, 255, m / 3, 8, 9)
                stroke(random(255), random(255), random(255), stroker * TAU / 4);
                //stroke(random(255), random(255), random(255),100);
                //stroke(0, stroker)
                noiseSeed(this.noise)
                noFill()
                push()
                translate(this.pos.x, this.pos.y)
                rotate(this.r)

                for (let s = this.s * 0.086; s < this.s; s += this.s * 0.06) {
                    beginShape()
                    for (let i = 0; i < TAU; i += TAU * 0.02) {
                        let roff = map(noise(sin(i * this.fold), cos(i * this.fold), s + frameCount / this.framer), 0, 0.6, -s / 4, s / 4)
                        curveVertex(cos(i + 10 / s) * (s / 4 + roff), sin(i + 10 / s) * (s / 4 + roff))
                    }
                    endShape(CLOSE)
                }
                pop()
            }
    }

    end() {
        this.count++
            if (this.count > this.done) {
                let index = flakes.indexOf(this);
                flakes.splice(index, 1);
            }
    }
}
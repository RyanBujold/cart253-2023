class Ball {

    constructor(x, y, note, synth) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.fill = {
            r: random(0, 255),
            g: random(0, 255),
            b: random(0, 255),
        }
        this.speed = 3;
        this.velocity = {
            x: random(-this.speed, this.speed),
            y: random(-this.speed, this.speed),
        }
        // Oscillator
        this.oscillator = new p5.Oscillator();
        this.nearFreq = 220;
        this.farFreq = 440;
        this.oscillator.amp(0.1);
        this.oscillator.start();
        // Synthesizer
        this.note = note;
        this.synthesizer = synth;
        // Distance
        this.maxdistance = dist(0, 0, width / 2, height / 2);
    }

    move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        let d = dist(this.x, this.y, width / 2, height / 2);
        let newFreq = map(d, 0, this.maxdistance, this.nearFreq, this.farFreq);
        this.oscillator.freq(newFreq);
    }

    bounce() {
        if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
            this.velocity.x = -this.velocity.x;
            this.playNote();
        }
        if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
            this.velocity.y = -this.velocity.y;
            this.playNote();
        }
    }

    playNote() {
        this.synthesizer.play(this.note, 0.2, 0, 0.1);
    }

    display() {
        push();
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}
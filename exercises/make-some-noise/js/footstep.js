class Footstep {

    constructor(x, y, panner, sound) {
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
        // Distance
        this.maxdistance = dist(0, 0, width / 2, height / 2);
        // Panner
        this.panner = panner;
        this.panner.process(sound);
        sound.loop();
    }

    move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Set the direction of where the sound is comming from based on our current position
        this.panner.set(this.x - width/2, this.y - height/2, 0, 0.1);
    }

    bounce() {
        if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
            this.velocity.y = -this.velocity.y;
        }
    }

    display() {
        // Draw a footstep
        push();
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        ellipse(this.x, this.y, 30, 60);
        rect(this.x - 10, this.y + 35, 20, 20)
        pop();
    }
}
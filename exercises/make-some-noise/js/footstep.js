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
        this.rotation = 0;
        // Panner
        this.panner = panner;
        this.sound = sound;
        this.panner.process(this.sound);
        this.sound.loop();
        // Timer
        this.timer = {
            limit: 60,
            count: 0,
        }
    }

    move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Calculate the angle the footstep is traveling
        angleMode(DEGREES);
        this.rotation = atan(this.velocity.y / this.velocity.x);
        // Change the direction of the rotation depending on if its traveling right or left.
        if(this.velocity.x > 0){
            this.rotation += 90;
        }
        else{
            this.rotation -= 90;
        }

        // Set the direction of where the sound is comming from based on our current position
        this.panner.set(this.x - width / 2, this.y - height / 2, 0, 0.1);
    }

    bounce() {
        if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
            this.velocity.x = -this.velocity.x;
            console.log(this.rotation);
        }
        if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
            this.velocity.y = -this.velocity.y;
            console.log(this.rotation);
        }

    }

    display() {
        // Draw a footstep
        push();
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        angleMode(DEGREES);
        translate(this.x, this.y);
        rotate(this.rotation);
        ellipse(0, 0, 30, 60);
        rect(-10, 35, 20, 20)
        pop();
    }
}
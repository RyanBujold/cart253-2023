class Footstep {

    constructor(x, y, panner, sound) {
        this.x = x;
        this.y = y;
        this.size = 50;
        this.fill = {
            r: random(0, 255),
            g: random(0, 255),
            b: random(0, 255),
            a: 100,
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
            limit: 40,
            count: 0,
        }
        // Storing draw locations
        this.drawX = this.x;
        this.drawY = this.y;
        this.drawR = this.rotation;
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

        // Set the position of where the sound is comming from to our footstep
        this.panner.set(this.x - width / 2, this.y - height / 2, 0, 0.1);
        
        // Update our timer
        this.timer.count ++;
        if(this.timer.count > this.timer.limit){
            this.timer.count = 0;
            this.drawX = this.x;
            this.drawY = this.y;
            this.drawR = this.rotation;
        }
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
        this.fill.a = map(this.timer.count, 0, this.timer.limit, 255, 0);
        push();
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
        angleMode(DEGREES);
        translate(this.drawX, this.drawY);
        rotate(this.drawR);
        ellipse(0, 0, 30, 60);
        rect(-10, 35, 20, 20)
        pop();
    }
}
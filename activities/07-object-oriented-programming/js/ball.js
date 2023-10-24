/**
 * A class defining a ball.
 */
class Ball {

    constructor(x, y) {
        // Position
        this.x = x;
        this.y = y;
        // Speed
        this.velocity = {
            x: 0,
            y: 0,
        }
        this.acceleration = {
            x: 0,
            y: 0,
        }
        this.maxSpeed = 10;
        // Size
        this.size = 50;
        // Properties
        this.active = true;
    }

    move() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        constrain(this.velocity.x, -this.maxSpeed, this.maxSpeed);
        constrain(this.velocity.y, -this.maxSpeed, this.maxSpeed);

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.y > height) {
            this.active = false;
        }
    }

    display() {
        push();
        fill(0, 0, 255);
        stroke(0);
        ellipse(this.x, this.y, this.size);
        pop();
    }

    gravity(force) {
        this.acceleration.y += force;
    }

    bounce(paddle) {
        if (this.x > paddle.x - paddle.width/2 && this.x < paddle.x + paddle.width/2 && this.y + this.size / 2 >= paddle.y - paddle.height / 2) {
            this.velocity.y = -this.velocity.y;
            this.acceleration.y = 0;
        }
    }
}
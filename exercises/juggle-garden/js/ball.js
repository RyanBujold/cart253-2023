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
        this.bounceCount = 0;
    }

    move() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.velocity.x = constrain(this.velocity.x, -this.maxSpeed, this.maxSpeed);
        this.velocity.y = constrain(this.velocity.y, -this.maxSpeed, this.maxSpeed);

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x < 0 || this.x > width) {
            this.velocity.x = -this.velocity.x;
            this.acceleration.x = 0;
        }

        if (this.y > height) {
            this.active = false;
        }
    }

    display() {
        push();
        let blue = map(this.bounceCount, 0, 30, 255, 0)
        fill(0, 0, blue);
        stroke(0);
        ellipse(this.x, this.y, this.size);
        pop();
    }

    gravity(force) {
        force += this.bounceCount * 0.0005;
        this.acceleration.y += force;
    }

    bounce(paddle) {
        if (paddle.circle == false) {
            // If the paddle is flat, bounce the ball up if it hits the paddle
            if (this.x > paddle.x - paddle.width / 2 && this.x < paddle.x + paddle.width / 2 && this.y + this.size / 2 >= paddle.y - paddle.height / 2 && this.y + this.size / 2 < paddle.y + paddle.height) {
                this.bounceBall();
            }
        }
        else {
            // If the paddle is round, bounce the ball at an angle depending on what side it lands on.
            // Left side
            if (this.x > paddle.x - paddle.width / 2 && this.x < paddle.x && this.y + this.size / 2 >= paddle.y - paddle.height / 2 && this.y + this.size / 2 < paddle.y + paddle.height) {
                this.acceleration.x -= 1;
                this.maxSpeed = 20;
                this.size = 25;
                this.bounceBall();
            }
            // Right side
            else if (this.x < paddle.x + paddle.width / 2 && this.x > paddle.x && this.y + this.size / 2 >= paddle.y - paddle.height / 2 && this.y + this.size / 2 < paddle.y + paddle.height) {
                this.acceleration.x += 1;
                this.maxSpeed = 20;
                this.size = 25;
                this.bounceBall();
            }
        }
    }

    bounceBall() {
        this.velocity.y = -this.velocity.y;
        this.acceleration.y = 0;
        this.bounceCount++;
        this.y = paddle.y - paddle.height;
    }

    // Check if we are close enough to the enemy to destroy them
    destroy(enemy) {
        if (dist(this.x, this.y, enemy.x + enemy.size / 2, enemy.y + enemy.size / 2) < enemy.size / 2) {
            this.acceleration.x += random(-0.1, 0.1);
            return true;
        }
        else {
            return false;
        }
    }

}
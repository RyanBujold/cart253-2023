class User {
    /**
     * A user class that is controlled with arrow keys and uses a flashlight.
     * @param {*} x starting horizontal point on the canvas.
     * @param {*} y starting vertical point on the canvas.
     */

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.size = 50;
        this.flashlight = {
            range: 30,
            distance: 500,
        };
        this.moveSpeed = 3;
        this.turnSpeed = 1.5;
    }

    move() {
        // Rotate the user right or left
        if (keyIsDown(LEFT_ARROW)) {
            this.rotation += this.turnSpeed;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.rotation -= this.turnSpeed;
        }
        // Move forward and backwards
        if (keyIsDown(UP_ARROW)) {
            this.x -= sin(this.rotation) * this.moveSpeed;
            this.y -= cos(this.rotation) * this.moveSpeed;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.x += sin(this.rotation) * this.moveSpeed;
            this.y += cos(this.rotation) * this.moveSpeed;
        }
    }

    display() {
        push();
        // Draw the user
        fill(200, 0, 0);
        ellipse(this.x, this.y, this.size);

        // Draw a pointer for the direction the user is facing
        stroke(0, 200, 0);
        line(this.x, this.y, this.x - sin(this.rotation) * 50, this.y - cos(this.rotation) * 50);
        noStroke();
        pop();
    }

    displayFlashlight() {
        // Draw the user's sight
        fill(255, 255, 255, 50);
        let leftSightPoint = {
            x: this.x - sin(this.rotation + this.flashlight.range) * this.flashlight.distance,
            y: this.y - cos(this.rotation + this.flashlight.range) * this.flashlight.distance,
        }
        let rightSightPoint = {
            x: this.x - sin(this.rotation - this.flashlight.range) * this.flashlight.distance,
            y: this.y - cos(this.rotation - this.flashlight.range) * this.flashlight.distance,
        }
        triangle(this.x, this.y, leftSightPoint.x, leftSightPoint.y, rightSightPoint.x, rightSightPoint.y);
    }
}
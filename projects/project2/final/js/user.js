class User {
    /**
     * A user class that is controlled with arrow keys and uses a flashlight.
     * @param {*} x starting horizontal point on the canvas.
     * @param {*} y starting vertical point on the canvas.
     * @param {*} walls the walls of the current map.
     */

    constructor(x, y, walls) {
        this.x = x;
        this.y = y;
        this.rotation = 180;
        this.size = 40;
        this.w = this.size / 2;
        this.h = this.size / 2;
        this.flashlight = {
            range: 30,
            distance: 300,
        };
        this.moveSpeed = 2;
        this.turnSpeed = 1.75;
        // Make a square collider for the user
        this.collisionBox = {
            x: this.x - this.w,
            y: this.y - this.h,
            w: this.size,
            h: this.size,
        }
        this.walls = walls;
    }

    updateBox() {
        // Update our collider box
        this.collisionBox = {
            x: this.x - this.w,
            y: this.y - this.h,
            w: this.size,
            h: this.size,
        }
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
        let moveX = 0;
        let moveY = 0;
        if (keyIsDown(UP_ARROW)) {
            moveX = -sin(this.rotation) * this.moveSpeed;
            moveY = -cos(this.rotation) * this.moveSpeed;
        }
        else if (keyIsDown(DOWN_ARROW)) {
            moveX = sin(this.rotation) * this.moveSpeed;
            moveY = cos(this.rotation) * this.moveSpeed;
        }

        this.x += moveX;
        this.y += moveY;
        this.updateBox();

        // Check collision with walls
        let didCollide = false;
        for (let i = 0; i < this.walls.length; i++) {
            if (this.checkCollision(this.walls[i])) {
                didCollide = true;
            }
        }
        // If we collided with a wall, stop our movement
        if (didCollide) {
            this.x += -moveX
            this.y += -moveY;
            this.updateBox();
        }

        // If we collided with an enemy, end the game?


    }

    display() {
        push();
        // Draw the user
        fill(200, 0, 0);
        ellipse(this.x, this.y, this.size);
        // Draw a pointer for the direction the user is facing
        //stroke(0, 200, 0);
        //line(this.x, this.y, this.x - sin(this.rotation) * 50, this.y - cos(this.rotation) * 50);
        //noStroke();
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

    checkCollision(object) {
        let didCollide = false;
        let box = this.collisionBox;
        if (box.x + box.w >= object.x && box.x <= object.x + object.w && box.y <= object.y + object.h && box.y + box.h >= object.y) {
            didCollide = true;
        }
        return didCollide;
    }

}
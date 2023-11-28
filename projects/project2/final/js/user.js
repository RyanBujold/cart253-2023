class User extends Collider{

    constructor(x, y, walls) {
        super(x,y);
        this.size = 40;
        this.w = this.size / 2;
        this.h = this.size / 2;
        this.rotation = 180;
        this.flashlight = {
            range: 30,
            distance: 500,
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
        this.bullets = [];
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

        // Fire a bullet
        if(keyIsDown(SHIFT)){
            this.fireBullet();
        }

        // Update the player's bullets
        for(let i = 0; i < this.bullets.length; i++){
            this.bullets[i].travel();
        }
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
        // Draw our bullets
        for(let i = 0; i < this.bullets.length; i++){
            this.bullets[i].display();
        }
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

    fireBullet(){
        this.bullets.push(new Bullet(this.x, this.y, this.rotation));
    }

}
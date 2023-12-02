class User extends Collider {

    constructor(x, y, walls) {
        super(x, y);
        this.size = 40;
        this.w = this.size / 2;
        this.h = this.size / 2;
        this.rotation = 180;
        this.flashlight = {
            range: 30,
            distance: 400,
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
        this.fireTimer = {
            limit: 60,
            count: 0,
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
    }

    // Check if the user collided with an enemy. return true if the user collides
    checkDefeat() {
        for (let i = 0; i < enemies.length; i++) {
            // If the user is too close to an enemy, end the game
            if (dist(user.x, user.y, enemies[i].x, enemies[i].y) < 30) {
                return true;
            }
        }
        return false;
    }

    updateBullets(enemies) {
        // Fire a bullet
        // Update and check a timer to make sure we don't fire continuously
        this.fireTimer.count++;
        if (keyIsDown(CONTROL) && this.fireTimer.count >= this.fireTimer.limit) {
            this.fireBullet();
            this.fireTimer.count = 0;
        }

        // Update the player's bullets
        for (let i = 0; i < this.bullets.length; i++) {
            // Remove the inactive bulltes
            if(!this.bullets[i].isAlive){
                this.bullets.splice(i,1);
                continue;
            }
            // Move the bullet
            this.bullets[i].travel();
            // Check collision with walls
            for(let w = 0; w < this.walls.length; w++){
                if(this.bullets[i].checkCollision(this.walls[w])){
                    this.bullets[i].isAlive = false;
                }
            }
            // Check collision with enemies
            for(let e = 0; e < enemies.length; e++){
                if(this.bullets[i].checkCollision(enemies[e])){
                    this.bullets[i].isAlive = false;
                    // Damage the enemy if they are not a ghost
                    if(!enemies[e].isGhost){
                        enemies[e].health --;
                        if(enemies[e].health <= 0){
                            enemies[e].isAlive = false;
                        } 
                    }
                }
            }
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
        for (let i = 0; i < this.bullets.length; i++) {
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

    fireBullet() {
        this.bullets.push(new Bullet(this.x, this.y, this.rotation));
    }

}
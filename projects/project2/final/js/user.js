class User extends Collider {

    /**
     * A class for a user that moves and shoots enemies.
     * @param {*} x Starting x position
     * @param {*} y Starting y position
     * @param {*} walls The walls of the current map
     * @param {*} gunShotSFX The gun shot sound effect
     * @param {*} footstepSFX The footstep sound effect
     */
    constructor(x, y, walls, gunShotSFX, footstepSFX) {
        super(x, y);
        this.size = 40;
        this.w = this.size;
        this.h = this.size;
        this.rotation = 180;
        this.flashlight = {
            range: 30,
            distance: 400,
        };
        this.moveSpeed = 2;
        this.turnSpeed = 1.75;
        this.walls = walls;
        this.bullets = [];
        this.fireTimer = {
            limit: 60,
            count: 0,
        }
        this.panner = new p5.Panner3D();
        this.gunShotSFX = gunShotSFX;
        this.footstepSFX = footstepSFX;
        this.panner.process(footstepSFX);
    }

    move() {
        // Rotate the user right or left
        let playFootsteps = false;
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
            playFootsteps = true;
        }
        else if (keyIsDown(DOWN_ARROW)) {
            moveX = sin(this.rotation) * this.moveSpeed;
            moveY = cos(this.rotation) * this.moveSpeed;
            playFootsteps = true;
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
            this.footstepSFX.stop();
        }
        else if (!this.footstepSFX.isPlaying() && playFootsteps) {
            // play the footsteps sounds if we are moving
            this.footstepSFX.play();
        }
        else if (!playFootsteps) {
            this.footstepSFX.stop();
        }

        // Set the position of where the sound is comming from to our footstep
        this.panner.set(this.x - width / 2, this.y - height / 2, 0, 0.1);
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
            if (!this.bullets[i].isAlive) {
                this.bullets.splice(i, 1);
                continue;
            }
            // Move the bullet
            this.bullets[i].travel();
            // Check collision with walls
            for (let w = 0; w < this.walls.length; w++) {
                if (this.bullets[i].checkCollision(this.walls[w])) {
                    this.bullets[i].isAlive = false;
                }
            }
            // Check collision with enemies
            for (let e = 0; e < enemies.length; e++) {
                if (this.bullets[i].checkCollision(enemies[e])) {
                    this.bullets[i].isAlive = false;
                    // Damage the enemy if they are not a ghost
                    if (!enemies[e].isGhost) {
                        enemies[e].health--;
                        if (enemies[e].health <= 0) {
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
        this.gunShotSFX.play();
        this.bullets.push(new Bullet(this.x - 2.5, this.y, this.rotation));
    }

}
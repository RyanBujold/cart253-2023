class Enemy extends Collider{

    constructor(x, y, walls, isGhost = false) {
        super(x,y);
        if (isGhost) {
            this.moveSpeed = 0.50;
            this.size = 75;
        }
        else {
            this.moveSpeed = 0.25;
            this.size = 50;
        }
        this.w = this.size / 2;
        this.h = this.size / 2;
        // Make a square collider for the user
        this.collisionBox = {
            x: this.x - this.w,
            y: this.y - this.h,
            w: this.size,
            h: this.size,
        }
        this.walls = walls;
        this.isGhost = isGhost
    }

    move(user) {
        let moveX = 0;
        let moveY = 0;
        // Move the enemy towards the user.
        if (this.x >= user.x) {
            moveX -= this.moveSpeed;
        }
        if (this.x <= user.x) {
            moveX += this.moveSpeed;
        }
        if (this.y >= user.y) {
            moveY -= this.moveSpeed;
        }
        if (this.y <= user.y) {
            moveY += this.moveSpeed;
        }

        // If we are a ghost, ignore collision
        if(this.isGhost){
            this.x += moveX;
            this.y += moveY;
            this.updateBox();
            return;
        }

        // Update our movement for both the x and y axis seperately
        this.x += moveX;
        this.updateBox();

        // Check collision with walls
        let didCollideX = false;
        for (let i = 0; i < this.walls.length; i++) {
            if (this.checkCollision(this.walls[i])) {
                didCollideX = true;
            }
        }
        // If we collided with a wall, stop our forward movement
        if (didCollideX) {
            this.x += -moveX;
            this.updateBox();
        }

        this.y += moveY;
        this.updateBox();

        // Check collision with walls
        let didCollideY = false;
        for (let i = 0; i < this.walls.length; i++) {
            if (this.checkCollision(this.walls[i])) {
                didCollideY = true;
            }
        }
        // If we collided with a wall, stop our forward movement
        if (didCollideY) {
            this.y += -moveY;
            this.updateBox();
        }
    }

    display(user) {
        // Draw the enemy
        push();
        // Make the enemy more visible when its approaching the user
        let shade = map(dist(this.x, this.y, user.x, user.y), 0, 200, 200, 0);
        if (this.isGhost == false) {
            fill(shade,0,shade);
        } 
        else {
            fill(shade);
        }
        ellipse(this.x, this.y, this.size);
        pop();
    }
}
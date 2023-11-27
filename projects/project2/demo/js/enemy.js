class Enemy {

    /**
     * An enemy class that chases the user 
     * @param {*} x starting horizontal point on the canvas.
     * @param {*} y starting vertical point on the canvas.
     * @param {*} walls the walls of the current map.
     */
    constructor(x, y, walls){
        this.x = x;
        this.y = y;
        this.size = 50;
        this.w = this.size/2;
        this.h = this.size/2;
        this.moveSpeed = 0.75;
        // Make a square collider for the user
        this.collisionBox = {
            x: this.x - this.w,
            y: this.y - this.h,
            w: this.size,
            h: this.size,
        }
        this.walls = walls;
    }

    updateBox(){
        // Update our collider box
        this.collisionBox = {
            x: this.x - this.w,
            y: this.y - this.h,
            w: this.size,
            h: this.size,
        }
    }

    move(user){
        let moveX = 0;
        let moveY = 0;
        // Move the enemy towards the user.
        if(this.x >= user.x){
            moveX -= this.moveSpeed;
        }
        if(this.x <= user.x){
            moveX += this.moveSpeed;
        }
        if(this.y >= user.y){
            moveY -= this.moveSpeed;
        }
        if(this.y <= user.y){
            moveY += this.moveSpeed;
        }

        this.x += moveX;
        this.y += moveY;
        this.updateBox();

        // Check collision with walls
        let didCollide = false;
        for(let i = 0; i < this.walls.length; i++){
            if(this.checkCollision(this.walls[i])){
                didCollide = true;
            }
        }
        // If we collided with a wall, stop our forward movement
        if(didCollide){
            this.x += -moveX;
            this.y += -moveY;
            this.updateBox();
        }
    }

    display(user) {
        // Draw the enemy
        push();
        // Make the enemy more visible when its approaching the user
        let shade = map(dist(this.x, this.y, user.x, user.y), 0, 200, 200, 0);
        fill(shade);
        ellipse(this.x, this.y, this.size);
        pop();
    }

    checkCollision(wall) {
        let didCollide = false;
        let box = this.collisionBox;
        if (box.x + box.w >= wall.x && box.x <= wall.x + wall.w && box.y <= wall.y + wall.h && box.y + box.h >= wall.y) {
            didCollide = true;
        }
        return didCollide;
    }
}
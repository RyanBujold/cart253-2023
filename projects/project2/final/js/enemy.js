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
        this.size = 40;
        this.w = this.size/2;
        this.h = this.size/2;
        this.moveSpeed = 1;
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
        // Move the enemy towards the user.
        if(this.x >= user.x){
            this.x -= this.moveSpeed;
        }
        if(this.x <= user.x){
            this.x += this.moveSpeed;
        }
        if(this.y >= user.y){
            this.y -= this.moveSpeed;
        }
        if(this.y <= user.y){
            this.y += this.moveSpeed;
        }
        
        //this.updateBox();
    }

    display() {
        push();
        // Draw the enemy
        fill(200,0,200);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}
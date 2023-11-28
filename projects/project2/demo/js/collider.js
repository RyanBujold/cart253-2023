class Collider {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.w;
        this.h;

        this.collisionBox = {
            x:this.x,
            y:this.y,
            w:this.w,
            h:this.h,
        }
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

    checkCollision(entity) {
        // Check for collision with another entity
        let didCollide = false;
        let box = this.collisionBox;
        if (box.x + box.w >= entity.x && box.x <= entity.x + entity.w && box.y <= entity.y + entity.h && box.y + box.h >= entity.y) {
            didCollide = true;
        }
        return didCollide;
    }
}
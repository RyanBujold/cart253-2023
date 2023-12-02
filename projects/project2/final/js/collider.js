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

        this.debug = false;
    }

    updateBox() {
        // Update our collider box
        this.collisionBox = {
            x: this.x - this.w/2,
            y: this.y - this.h/2,
            w: this.w,
            h: this.h,
        }

        if(this.debug){
            push();
            stroke(200,0,0);
            fill(0,200,0);
            rect(this.collisionBox.x, this.collisionBox.y, this.collisionBox.w, this.collisionBox.h);
            pop();
        }
    }

    checkCollision(collider) {
        // Check for collision with another entity
        let didCollide = false;
        let box = this.collisionBox;
        let entity = collider.collisionBox;
        if (box.x + box.w >= entity.x && box.x <= entity.x + entity.w && box.y <= entity.y + entity.h && box.y + box.h >= entity.y) {
            didCollide = true;
        }
        return didCollide;
    }
}
class Bullet extends Collider{

    constructor(x,y,rotation){
        super(x,y);
        this.moveSpeed = 10;
        this.rotation = rotation;
        this.size = 5;
        this.w = this.size;
        this.h = this.size;
        this.isAlive = true;
    }

    display(){
        push();
        fill(212, 146, 25);
        rect(this.x,this.y,this.w,this.h);
        pop();
    }

    updateBox() {
        // Update our collider box
        this.collisionBox = {
            x: this.x,
            y: this.y,
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

    travel(){
        this.x -= sin(this.rotation) * this.moveSpeed;
        this.y -= cos(this.rotation) * this.moveSpeed;
        this.updateBox();
    }
}
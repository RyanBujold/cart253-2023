class Bullet extends Collider{

    constructor(x,y,rotation){
        super(x,y);
        this.moveSpeed = 0.1;
        this.rotation = rotation;
        this.w = 5;
        this.h = 5;
    }

    display(){
        push();
        fill(212, 146, 25);
        rect(this.x,this.y,this.w,this.h);
        pop();
    }

    travel(){
        this.x -= sin(this.rotation) * this.moveSpeed;
        this.y -= cos(this.rotation) * this.moveSpeed;
        this.updateBox();
    }
}
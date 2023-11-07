class Ball {

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 50;
        this.fill = {
            r:random(0,255),
            g:random(0,255),
            b:random(0,255),
        }
        this.speed = 3;
        this.velocity = {
            x: random(-this.speed, this.speed),
            y: random(-this.speed, this.speed),
        }
    }

    move(){
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    bounce(){
        if(this.x - this.size/2 < 0 || this.x + this.size/2 > width){
            this.velocity.x = -this.velocity.x;
        }
        if(this.y - this.size/2 < 0 || this.y + this.size/2 > height){
            this.velocity.y = -this.velocity.y;
        }
    }

    display(){
        push();
        noStroke();
        fill(this.fill.r, this.fill.g, this.fill.b);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}
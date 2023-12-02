class Wall extends Collider{

    constructor(x, y, w, h) {
        super(x,y);
        this.w = w;
        this.h = h;
        // The 4 corners of the wall
        this.p1 = {
            x: x,
            y: y,
        }
        this.p2 = {
            x: x + w,
            y: y,
        }
        this.p3 = {
            x: x,
            y: y + h,
        }
        this.p4 = {
            x: x + w,
            y: y + h,
        }
        // The 4 shadow points
        this.s1;
        this.s2;
        this.s3;
        this.s4;
        this.shadowAlpha = 255;

        this.debug = false;
    }

    update(user) {
        // Update the positions of the shadow points based on the user's position
        this.s1 = this.getShadow(user, this.p1);
        this.s2 = this.getShadow(user, this.p2);
        this.s3 = this.getShadow(user, this.p3);
        this.s4 = this.getShadow(user, this.p4);
        // Update collision
        this.updateBox();
    }

    // Override the collision updater to fit a rectangle rather than a circle
    updateBox() {
        // Update our collider box
        this.collisionBox = {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
        }
    }

    display() {
        push();
        fill(0,0,0,this.shadowAlpha);
        if(this.debug){
            stroke(0,0,200);
            fill(100);
        }
        // Shadow top
        beginShape();
        vertex(this.p1.x, this.p1.y);
        vertex(this.s1.x, this.s1.y);
        vertex(this.s2.x, this.s2.y);
        vertex(this.p2.x, this.p2.y);
        endShape(CLOSE);
        // Shadow left
        beginShape();
        vertex(this.p1.x, this.p1.y);
        vertex(this.s1.x, this.s1.y);
        vertex(this.s3.x, this.s3.y);
        vertex(this.p3.x, this.p3.y);
        endShape(CLOSE);
        // Shadow right
        beginShape();
        vertex(this.p3.x, this.p3.y);
        vertex(this.s3.x, this.s3.y);
        vertex(this.s4.x, this.s4.y);
        vertex(this.p4.x, this.p4.y);
        endShape(CLOSE);
        // Shadow bottom
        beginShape();
        vertex(this.p4.x, this.p4.y);
        vertex(this.s4.x, this.s4.y);
        vertex(this.s2.x, this.s2.y);
        vertex(this.p2.x, this.p2.y);
        endShape(CLOSE);
        // Draw the wall
        fill(0);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }

    getShadow(user, point) {
        // The corner x and y
        let cx = point.x;
        let cy = point.y;
        // The maximum offset of the shadow
        let hoff = 10000;
        // Determine the position of the shadow point based on where the user is
        let hx = map(user.x, cx - canvasWidth, cx + canvasWidth, hoff, -hoff);
        let hy = map(user.y, cy - canvasHeight, cy + canvasHeight, hoff, -hoff);
        // Return the shadow point
        return {
            x: cx + hx,
            y: cy + hy,
        }
    }
}
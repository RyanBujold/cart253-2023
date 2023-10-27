/**
 * A class defining a paddle.
 */
class Paddle {

    constructor(w, h) {
        // Size
        this.width = w;
        this.height = h;
        // Position
        this.x = 0;
        this.y = height;
        // Shape
        this.circle = false;
    }

    move() {
        this.x = mouseX;
        this.y = mouseY;
    }

    display() {
        push();
        fill(0, 255, 0);
        stroke(0);
        rectMode(CENTER);
        if (this.circle == true) {
            ellipse(this.x, this.y, this.width, this.height);
        }
        else {
            rect(this.x, this.y, this.width, this.height);
        }
        pop();
    }
}
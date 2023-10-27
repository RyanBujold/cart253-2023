class Enemy {

    constructor() {
        // Position
        this.x = 0;
        this.y = 0;
        // Size
        this.size = random(70, 100);
        // Speed
        this.speed = random(2, 10);
    }

    move() {
        if (this.x + this.size > width || this.x < 0) {
            this.y += this.size;
            this.speed = -this.speed;
        }
        this.x += this.speed;
    }

    display() {
        push();
        // Change the color based on how far they are from the top
        let red = map(this.y, 0, height, 255, 100)
        fill(red, 0, 0);
        stroke(0);
        rect(this.x, this.y, this.size);
        fill(0);
        triangle(this.x, this.y + 30, this.x, this.y + 60, this.x + 30, this.y + 60);
        triangle(this.x + this.size, this.y + 30, this.x + this.size, this.y + 60, this.x + this.size - 30, this.y + 60);
        pop();
    }
}
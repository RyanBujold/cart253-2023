/**
 * Juggle Garden
 * Ryan Bujold
 * 
 * Making a juggling simulation
 */

"use strict";

let paddle;
let balls = [];
let enemies = [];
let numBalls = 3;
let gravityForce = 0.0025;
let enemyTimer = {
    limit: 60,
    count: 0,
}
let defeatCounter = {
    limit: 10,
    count: 0
}
let victoryCounter = {
    limit: 50,
    count: 0
}
let state = "main";

/**
 * Load neccessary files
*/
function preload() {

}

/**
 * Setup objects and the canvas
*/
function setup() {
    createCanvas(1000, 800);

    // Create a paddle
    paddle = new Paddle(350, 50);

    // Create balls
    for (let i = 0; i < numBalls; i++) {
        let ball = new Ball(random(0, width), random(0, -100));
        balls.push(ball);
    }
}

/**
 * Draw on the canvas
*/
function draw() {
    background(150);

    switch (state) {
        case "main":
            mainState();
            break;
        case "win":
            winState();
            break;
        case "lose":
            loseState();
            break;
    }

}

function mainState() {
    // Paddle
    paddle.move();
    paddle.display();

    // Balls
    for (let i = 0; i < balls.length; i++) {
        // Only update the ball if it is active
        if (balls[i].active) {
            balls[i].gravity(gravityForce)
            balls[i].move();
            balls[i].bounce(paddle);
            balls[i].display();
            // If the ball is close to an enemy, destroy them
            for (let j = 0; j < enemies.length; j++) {
                if (balls[i].destroy(enemies[j])) {
                    enemies.splice(j, 1);
                    defeatCounter.count++;
                    victoryCounter.count++;
                }
            }
        }
    }

    // Enemies
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].move();
        enemies[i].display();
        // Check defeat
        if (enemies[i].y > height) {
            state = "lose";
        }
    }

    // Create enemies
    if (enemyTimer.count > enemyTimer.limit) {
        let enemy = new Enemy();
        enemies.push(enemy);
        enemyTimer.count = 0;
        enemyTimer.limit = random(30, 60);
    }
    enemyTimer.count++;

    // Create balls
    if (defeatCounter.count > defeatCounter.limit) {
        let ball = new Ball(width / 2, 0);
        balls.push(ball);
        defeatCounter.count = 0;
    }

    // Check victory
    if (victoryCounter.count >= victoryCounter.limit) {
        state = "win";
    }
}

function winState() {
    background(42, 191, 82);
    textSize(64);
    textFont('Georgia');
    text('YOU WIN', windowWidth / 4, windowHeight / 2);
}

function loseState() {
    background(150, 17, 17);
    textSize(64);
    textFont('Georgia');
    text('YOU LOSE', windowWidth / 4, windowHeight / 2);
}

// Toggle the paddle's shape
function mousePressed() {
    paddle.circle = !paddle.circle;
}
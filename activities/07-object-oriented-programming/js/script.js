/**
 * Object-Oriented Programming 
 * Ryan Bujold
 * 
 * Making a juggling simulation
 */

"use strict";

let paddle;
let balls = [];
let numBalls = 3;
let gravityForce = 0.0025;

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
    paddle = new Paddle(400, 100);

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
        }
    }
}
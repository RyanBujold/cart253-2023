/**
 * I like to move it
 * Ryan Bujold
 * 
 * Using variables to move shapes across the canvas.
 */

"use strict";

// The canvas's dimensions
let canvasWidth = 800;
let canvasHeight = 600;

// If true, draw the background every frame
let drawBackground = true;

// A bouncing box
let box = {
    x:50,
    y:50,
    w:200,
    h:75,
    red:0,
    green:0,
    blue:0,
    xVelocity:2,
    yVelocity:2,
}

// A bouncing ball
let ball = {
    x:100,
    y:100,
    w:100,
    h:100,
    red:200,
    green:100,
    blue:0,
    velocity:2,
    gravity:1.05,
    bounce:20,
}

// A triangle
let pyramid = {
    x1:100,
    y1:50,
    x2:canvasWidth/2 - 50,
    y2:canvasHeight/2,
    x3:canvasWidth/2 + 50,
    y3:canvasHeight/2,
    red:0,
    green:255,
    blue:255,
}

/**
 * Preload files
*/
function preload() {

}


/**
 * Setup the canvas
*/
function setup() {
    createCanvas(canvasWidth,canvasHeight);
    noStroke();
}


/**
 * Draw shapes moving across the canvas
*/
function draw() {
    // Draw the background if specified
    if(drawBackground){
        background(0,50,200);
    }

    // Pyramid
    fill(pyramid.red, pyramid.green, pyramid.blue);
    triangle(pyramid.x1, pyramid.y1, pyramid.x2, pyramid.y2, pyramid.x3, pyramid.y3);
    // Make a point of the pyramid follow the mouse cursor
    pyramid.x1 = mouseX;
    pyramid.y1 = mouseY;
    // Make sure the pyramid doesn't go off the canvas
    pyramid.x1 = constrain(mouseX, 0, canvasWidth);
    pyramid.y1 = constrain(mouseY, 0, canvasHeight);

    // Ball
    fill(ball.red, ball.green, ball.blue);
    ellipse(ball.x, ball.y, ball.w, ball.h);
    // Move the ball to the right and apply gravity
    ball.x += ball.velocity;
    ball.y = ball.y + ball.gravity;
    // Increase gravity so it falls faster over time
    ball.gravity += 0.5;
    // Make the ball's width grow and shrink based on how far it
    // is from the bottom of the canvas
    ball.w = map(ball.y, 0, canvasHeight, 10,150);
    // If the ball touches the right side of the canvas, toggle the
    // the background being drawn and reset the ball to the left
    // side of the canvas
    if(ball.x > canvasWidth){
        ball.x = 0;
        drawBackground = !drawBackground;
    }
    // Once the ball hits the bottom of the canvas, changes its gravity
    // so that it bounces upwards
    if(ball.y > canvasHeight){
        ball.gravity = -ball.bounce;
    }

    // Box
    fill(box.red, box.green, box.blue);
    rect(box.x, box.y, box.w, box.h);
    box.x += box.xVelocity;
    box.y += box.yVelocity;
    // If the box collides with the right or left side of the canvas, flip
    // it's x velocity so it bounces along the x axis
    if(box.x + box.w > canvasWidth || box.x < 0){ 
        box.xVelocity = -box.xVelocity;
        box.red = random(0,255);
        box.green = random(0,255);
        box.blue = random(0,255);
    }
    // If the box collides with the botoom or top side of the canvas, flip
    // it's y velocity so it bounces along the y axis
    if(box.y + box.h > canvasHeight || box.y < 0){
        box.yVelocity = -box.yVelocity;
        box.red = random(0,255);
        box.green = random(0,255);
        box.blue = random(0,255);
    }

}
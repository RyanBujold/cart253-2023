/**
 * I like to move it
 * Ryan Bujold
 * 
 * Using variables to move shapes across the canvas.
 */

"use strict";

let canvasWidth = 800;
let canvasHeight = 600;

let box = {
    x:50,
    y:50,
    w:100,
    h:50,
    xVelocity:2,
    yVelocity:2,
    color:150,
}

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
    background(0,50,200);

    // Triangle
    fill(pyramid.red, pyramid.green, pyramid.blue);
    triangle(pyramid.x1, pyramid.y1, pyramid.x2, pyramid.y2, pyramid.x3, pyramid.y3);
    pyramid.x1 = mouseX;
    pyramid.y1 = mouseY;
    pyramid.x1 = constrain(mouseX, 0, canvasWidth);
    pyramid.y1 = constrain(mouseY, 0, canvasHeight);

    // Ball
    fill(ball.red, ball.green, ball.blue);
    ellipse(ball.x, ball.y, ball.w, ball.h);
    ball.x += ball.velocity;
    ball.y = ball.y + ball.gravity;
    ball.gravity += 0.5;
    ball.w = map(ball.y, 0, canvasHeight, 10,150);
    if(ball.x > canvasWidth){
        ball.x = 0;
    }
    if(ball.y > canvasHeight){
        ball.gravity = -ball.bounce;
    }

    // Box
    fill(box.color);
    rect(box.x, box.y, box.w, box.h);
    box.x += box.xVelocity;
    box.y += box.yVelocity;
    if(box.x + box.w > canvasWidth || box.x < 0){ 
        box.xVelocity = -box.xVelocity;
    }
    if(box.y + box.h > canvasHeight || box.y < 0){
        box.yVelocity = -box.yVelocity;
    }
}
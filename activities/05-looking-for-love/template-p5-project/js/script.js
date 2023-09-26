/**
 * Looking for Love
 * Ryan Bujold
 * 
 * Making a simulation of love with randomly moving circles.
 */

"use strict";

let canvasWidth = 800;
let canvasHeight = 800;

let circle1 = {
    x:canvasWidth*(1/3),
    y:canvasHeight/2,
    size:100,
    vx:0,
    vy:0,
    speed:5,
}
let circle2 = {
    x:canvasWidth*(2/3),
    y:canvasHeight/2,
    size:100,
    vx:0,
    vy:0,
    speed:5,
}

/**
 * Load files
*/
function preload() {

}


/**
 * Setup the canvas
*/
function setup() {
    createCanvas(canvasWidth, canvasHeight);
    noStroke();

    // Randomize the circle's movement directions
    circle1.vx = random(-circle1.speed, circle1.speed);
    circle1.vy = random(-circle1.speed, circle1.speed);
    circle2.vx = random(-circle2.speed, circle2.speed);
    circle2.vy = random(-circle2.speed, circle2.speed);
}


/**
 * Draw on the canvas every frame
*/
function draw() {
    background(0);

    // Move the circles
    circle1.x += circle1.vx;
    circle1.y += circle1.vy;
    circle2.x += circle2.vx;
    circle2.y += circle2.vy;
    // Draw the circles
    fill(255);
    ellipse(circle1.x, circle1.y, circle1.size);
    ellipse(circle2.x, circle2.y, circle2.size);

    if(dist(circle1.x, circle1.y, circle2.x, circle2.y) <= circle1.size || 
       dist(circle1.x, circle1.y, circle2.x, circle2.y) <= circle2.size ){
       // True Love!
    }
    else if(isCircleTouchingEdge(circle1.x, circle1.y, circle1.size)){
        // Play the sad ending
    }
    else if (isCircleTouchingEdge(circle2.x, circle2.y, circle2.size)){
        // Play the sad ending
    }

}

// Returns true if the circle is touching an edge of the canvas.
// Otherwise returns false.
function isCircleTouchingEdge(x, y, size){
    let radius = size/2;
    if(x + radius > canvasWidth || x < 0){
        return true;
    }
    else if(y + radius > canvasHeight || y < 0){
        return true;
    }
    else{
        return false;
    }
}
/**
 * Moving Pictures
 * Ryan Bujold
 * 
 * Making a simple abstract animation on a canvas.
 */

"use strict";

//canvas size
let canvasWidth = 500;
let canvasHeight = 600;

// background object
let bg = {
    red: 0,
    green: 0,
    blue: 0,
}
// first circle
let circle1 = {
    x:0,
    y:canvasHeight/2,
    size:100,
    fill:255,
    alpha:200,
}
// second circle 
let circle2 = {
    x:canvasWidth,
    y:canvasHeight/2,
    size:60,
    fill:255,
    alpha:200,
}


/**
 * Description of preload
*/
function preload() {

}


/**
 * Setting up the canvas
*/
function setup() {
    // Creating the canvas
    createCanvas(canvasWidth,canvasHeight);
    noStroke();
}


/**
 * Drawing on the canvas each frame
*/
function draw() {
    // Coloring in the background
    background(bg.red,bg.green,bg.blue);
    bg.blue += 1;

    // Circle 1
    fill(circle1.fill, circle1.alpha);
    ellipse(circle1.x, circle1.y, circle1.size);
    circle1.x += 1;
    circle1.x = constrain(circle1.x, 0, canvasWidth/2);

    // Circle 2
    fill(circle2.fill, circle2.alpha);
    ellipse(circle2.x, circle2.y, circle2.size);
    circle2.x -= 1;
    circle2.x = constrain(circle2.x, canvasWidth/2, canvasWidth);

}
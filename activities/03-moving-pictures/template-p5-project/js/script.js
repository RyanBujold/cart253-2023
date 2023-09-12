/**
 * Moving Pictures
 * Ryan Bujold
 * 
 * Making a simple abstract animation on a canvas.
 */

"use strict";

//canvas size
let canvasWidth = 500;
let canvasHeight = 500;

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
    speed:1,
    growth:1,
}
// second circle 
let circle2 = {
    x:canvasWidth,
    y:canvasHeight/2,
    size:60,
    fill:150,
    alpha:200,
    speed:-1,
    relativeSize:0.5,
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
    bg.blue = map(circle1.size, 0, canvasWidth, 0, 255);

    // Circle 1
    fill(circle1.fill, circle1.alpha);
    ellipse(circle1.x, circle1.y, circle1.size);
    circle1.x += circle1.speed;
    circle1.x = constrain(circle1.x, 0, canvasWidth/2);
    circle1.size += circle1.growth;
    circle1.size = constrain(circle1.size, 0, canvasWidth);

    // Circle 2
    fill(circle2.fill, circle2.alpha);
    ellipse(circle2.x, circle2.y, circle2.size);
    circle2.x += circle2.speed;
    circle2.x = constrain(circle2.x, canvasWidth/2, canvasWidth);
    circle2.size = circle1.size * circle2.relativeSize;
}
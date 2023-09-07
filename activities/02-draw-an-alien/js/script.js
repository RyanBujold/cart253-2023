/**
 * Drawing an alien
 * Ryan Bujold
 * 
 * Using javascript and p5 drawing instructions to 
 * draw an alien on a canvas.
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


/**
 * Making a canvas and drawing shapes onto it.
*/
function setup() {
    // Variables for the canva's width and height
    var canvasWidth = 600;
    var canvasHeight = 600;

    // Create the canvas and light blue background 
    createCanvas(canvasWidth,canvasHeight);
    background(3, 202, 252);
    // Make sure we don't draw any lines around our shapes
    noStroke();

    // Draw the aliens body
    fill(168, 172, 173);
    ellipse(canvasWidth/2, canvasHeight, 500);
    fill(54, 227, 57);
    quad(150, 400, canvasWidth/2, 500, 450, 400, canvasWidth/2, 300);



}


/**
 * Description of draw()
*/
function draw() {

}
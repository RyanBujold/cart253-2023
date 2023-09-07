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
    // Create the canvas and light blue background 
    createCanvas(600,700);
    background(3, 202, 252);
    // Make sure we don't draw any lines around our shapes
    noStroke();

    // Draw the aliens body
    fill(168, 172, 173);//gray
    ellipse(300, 700, 500);
    fill(50, 209, 53);//dark green
    quad(150, 500, 300, 650, 450, 500, 300, 400);

    // Draw the alien's head with a shadow underneath
    ellipseMode(CENTER);
    fill(0,0,0,50);//black with transparency
    ellipse(300,270,360,500);
    fill(54, 227, 57);//green
    ellipse(300,250,400,500);

}


/**
 * Description of draw()
*/
function draw() {

}
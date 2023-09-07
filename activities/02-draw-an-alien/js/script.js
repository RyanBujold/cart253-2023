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

    // Draw the eyes
    fill(0,0,0);//black
    ellipse(200,250,100,140);
    ellipse(400,250,100,140);
    fill(255,255,255);//white
    ellipse(220,210,20);
    ellipse(420,210,20);

    // Draw the nostrils
    fill(0,0,0,150);//black with transparency
    ellipse(280,350,20,10);
    ellipse(320,350,20,10);

    // Draw the mouth
    fill(0,0,0);//black
    quad(250,400,300,420,350,400,300,450);

}


/**
 * Description of draw()
*/
function draw() {

}
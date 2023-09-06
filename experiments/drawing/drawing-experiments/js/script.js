/**
 * Drawing Experiments
 * Ryan Bujold
 * 
 * Experimenting with drawing shapes on the canvas.
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


/**
 * Draws a canvas with colored shapes and lines.
*/
function setup() {
    createCanvas(500,500);

    // Setting the background to green
    background(100,255,100);

    // Make the color of lines purple and 
    // the color of shapes a darker green
    stroke(255,0,255);
    fill(0,255,100);

    rect(50,50,200,300);
    line(0,0,300,500);
    line(250,0,250,500);
    ellipse(250,250,100,50);
    
    // Change the color to light blue and
    // the make it a bit transparent
    fill(0,100,255,100);
    rectMode(CENTER);
    rect(250,250,30,30);
    point(250,250);

    // Remove the outline from the shapes and draw
    // as set of transparent ellipses
    noStroke();
    ellipseMode(CORNER);
    ellipse(400,250,40,60);
    fill(0,100,100,100);
    ellipse(400,250,40,50);
    fill(0,150,150,100);
    ellipse(400,250,40,40);
    fill(0,200,200,100);
    ellipse(400,250,40,30);
    fill(0,255,255,100);
    ellipse(400,250,40,20);
    fill(255,255,255,100);
    ellipse(400,250,40,10);
}


/**
 * Description of draw()
*/
function draw() {

}
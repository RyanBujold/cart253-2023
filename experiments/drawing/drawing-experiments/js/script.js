/**
 * Drawing Experiments
 * Ryan Bujold
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(500,500);

    background(100,255,100);

    stroke(255,0,255);
    fill(0,255,100);

    rect(50,50,200,300);
    line(0,0,300,500);
    line(250,0,250,500);
    ellipse(250,250,100,50);

    fill(0,100,255,100);
    rectMode(CENTER);
    rect(250,250,30,30);
    point(250,250);

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
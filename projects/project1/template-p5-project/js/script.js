/**
 * Project 1
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
    createCanvas(windowWidth,windowHeight,WEBGL);
}


/**
 * Description of draw()
*/
function draw() {
    background(0);
    orbitControl();
    box(200,400,400);
}
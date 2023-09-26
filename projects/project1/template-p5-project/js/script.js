/**
 * Project 1
 * Ryan Bujold
 * 
 * A simulation project.
 */

"use strict";

let fish = {
    x:500,
    y:500,
    w:300,
    h:150,
    fill:{
        r:0,
        g:0,
        b:200,
    },
    alpha:100,
}

/**
 * Load files
*/
function preload() {

}


/**
 * Set up the canvas
*/
function setup() {
    createCanvas(windowWidth,windowHeight);
    noStroke();
}


/**
 * Draw objects on the canvas
*/
function draw() {
    background(59, 126, 235);

    // -- Draw a fish --
    // Draw the body
    fill(fish.fill.r, fish.fill.g, fish.fill.b);
    ellipse(fish.x, fish.y, fish.w, fish.h);
    // Draw the fin
    let fishEndX = fish.x - fish.w/2 + 20;
    quad(fishEndX, fish.y, fishEndX -100, fish.y -100, fishEndX -50, fish.y, fishEndX -100, fish.y +100);
    // Draw the eye
    fill(0);
    ellipse(fish.x + 100, fish.y, 30);
}
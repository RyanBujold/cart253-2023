/**
 * I like to move it
 * Ryan Bujold
 * 
 * Using variables to move shapes across the canvas.
 */

"use strict";

let canvasWidth = 800;
let canvasHeight = 600;

let box = {
    x:50,
    y:50,
    w:100,
    h:50,
    xVelocity:2,
    yVelocity:2,
    color:150,
}

/**
 * Preload files
*/
function preload() {

}


/**
 * Setup the canvas
*/
function setup() {
    createCanvas(canvasWidth,canvasHeight);
    noStroke();
}


/**
 * Draw shapes moving across the canvas
*/
function draw() {
    background(100,0,100);

    // Box
    fill(box.color);
    rect(box.x, box.y, box.w, box.h);
    box.x += box.xVelocity;
    box.y += box.yVelocity;
    if(box.x + box.w > canvasWidth || box.x < 0){ 
        box.xVelocity = -box.xVelocity;
    }
    if(box.y + box.h > canvasHeight || box.y < 0){
        box.yVelocity = -box.yVelocity;
    }
}
/**
 * Project 1
 * Ryan Bujold
 * 
 * A simulation project.
 * 
 * Fish hook image from: https://www.pinterest.ca/pin/fish-hook-silhouette-free-svg--274719646000128423/
 */

"use strict";

// A fish object
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
    isFacingRight:true,
    speed:5,
}

let fishingLine = {
    x1:500,
    y1:0,
    x2:500,
    y2:200,
    fill:0,
}
let hookImg;

/**
 * Load files
*/
function preload() {
    hookImg = loadImage('assets/images/fishHook.png');
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

    // -- Fish --
    // Move the fish
    if(fish.isFacingRight){
        // Move to the right
        fish.x+=fish.speed;
        // If we reach the edge turn around
        if(fish.x > windowWidth){
            fish.isFacingRight = false;
        }
    }
    else {
        // Move to the left
        fish.x-=fish.speed;
        // If we reach the edge turn around
        if(fish.x < 0){
            fish.isFacingRight = true;
        }
    }
    // Draw the body
    fill(fish.fill.r, fish.fill.g, fish.fill.b);
    ellipse(fish.x, fish.y, fish.w, fish.h);
    if(fish.isFacingRight){
        // Draw the fin
        let fishEndX = fish.x - fish.w/2 + 20;
        quad(fishEndX, fish.y, fishEndX -100, fish.y -100, fishEndX -50, fish.y, fishEndX -100, fish.y +100);
        // Draw the eye
        fill(0);
        ellipse(fish.x + 100, fish.y, 30);
    }
    else {
        // Draw the fin
        let fishEndX = fish.x + fish.w/2 - 20;
        quad(fishEndX, fish.y, fishEndX +100, fish.y -100, fishEndX +50, fish.y, fishEndX +100, fish.y +100);
        // Draw the eye
        fill(0);
        ellipse(fish.x - 100, fish.y, 30);
    }

    // -- Fishing Line --
    // Draw the line
    stroke(0);
    line(fishingLine.x1, fishingLine.y1, fishingLine.x2, fishingLine.y2);
    noStroke();
    image(hookImg, fishingLine.x2 - 25, fishingLine.y2, 50, 50);
    
}
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
    isFacingRight:true,
    speed:5,
    isCaught:false,
}

// A fishing line
let fishingLine = {
    x1:500,
    y1:0,
    x2:500,
    y2:50,
    fill:0,
    speed:5,
}
let hookImg;
let hookImgSize = 50;

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
    // Randomize fish
    resetFish();
}

/**
 * Draw objects on the canvas
*/
function draw() {
    background(59, 126, 235);
    simulation();   
}

function simulation(){
    isFishCaught();
    move();
    display();
}

function isFishCaught(){
    // Get the x value of the fish's mouth
    let fishMouth = fish.x + fish.w/2;
    if(!fish.isFacingRight){
        fishMouth = fish.x - fish.w/2;
    }
    // If the fishing hook is close enough to the hook, the fish is caught
    if(dist(fishingLine.x2, fishingLine.y2 + hookImgSize, fishMouth, fish.y) < 15){
        fish.isCaught = true;
    }
}

function resetFish(){
    fish.x = 0 - fish.w;
    fish.y = random(windowHeight/4, windowHeight);
    fish.w = random(200, 500);
    fish.fill.r = random(0,255);
    fish.fill.g = random(0,255);
    fish.fill.b = random(0,255);
    fish.h = fish.w/2;
    fish.isCaught = false;
}

function move(){
    // Move the fishing line
    if(keyIsDown(LEFT_ARROW)){
        fishingLine.x1 -= fishingLine.speed;
    }
    if(keyIsDown(RIGHT_ARROW)){
        fishingLine.x1 += fishingLine.speed;
    }
    // If the fishing hook is not aligned with the fishing line,
    // move the hook towards it
    if(fishingLine.x1 != fishingLine.x2){
        fishingLine.x2 += (fishingLine.x1 - fishingLine.x2) * 1/120;
    }
    // Let the hook sink
    fishingLine.y2 ++;

    // If the fish is caught, follow the hook
    if(fish.isCaught){
        if(fish.isFacingRight){
            fish.x = fishingLine.x2 - fish.w/2;
        }
        else{
            fish.x = fishingLine.x2 + fish.w/2;
        }
        fish.y = fishingLine.y2 + hookImgSize;
        // Check if the fish is off screen
        if(fish.y - fish.h/2 < 0){
            resetFish();
        }
        return;
    }
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
}

function mouseMoved(){
    // Raise the fishing line when the mouse is moved
    if(fishingLine.y2 > -100){
        fishingLine.y2 -= fishingLine.speed;
    } 
}

function display(){
    // Draw the fish's body
    fill(fish.fill.r, fish.fill.g, fish.fill.b);
    ellipse(fish.x, fish.y, fish.w, fish.h);
    if(fish.isFacingRight){
        // Draw the fish' fin
        let fishEndX = fish.x - fish.w/2 + 20;
        quad(fishEndX, fish.y, fishEndX -100, fish.y -100, fishEndX -50, fish.y, fishEndX -100, fish.y +100);
        // Draw the fish's eye
        fill(0);
        ellipse(fish.x + 100, fish.y, 30);
    }
    else {
        // Draw the fish's fin
        let fishEndX = fish.x + fish.w/2 - 20;
        quad(fishEndX, fish.y, fishEndX +100, fish.y -100, fishEndX +50, fish.y, fishEndX +100, fish.y +100);
        // Draw the fish's eye
        fill(0);
        ellipse(fish.x - 100, fish.y, 30);
    }

    // Draw the fishing line
    stroke(0);
    line(fishingLine.x1, fishingLine.y1, fishingLine.x2, fishingLine.y2);
    noStroke();
    image(hookImg, fishingLine.x2 - hookImgSize/2, fishingLine.y2, hookImgSize, hookImgSize);
}
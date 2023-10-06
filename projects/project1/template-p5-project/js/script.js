/**
 * Project 1
 * Ryan Bujold
 * 
 * A simulation project of fishing. The user tries to catch the best fish while fishing.
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
    swim:1,
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
let counter = 0;
let lineTension = 0;

let state = "title";


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
    angleMode(DEGREES);
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
    // Run the selected state
    switch(state){
        case "title":
            titleState();
            break;
        case "simulation":
            fishingState();
            break;
        case "caught":
            caughtState();
            break;
    }
}

function titleState(){
    // Draw a fishing line
    stroke(0);
    line(500, 0, 500, windowHeight/2);
    noStroke();
    image(hookImg, 500 - hookImgSize/2, windowHeight/2, hookImgSize, hookImgSize);

    // Draw the title
    fill(48, 240, 182);
    textSize(64);
    textFont('Georgia');
    text('F', windowWidth/3, (windowHeight/2) + (sin(counter) * 30) );
    text('I', windowWidth/3 + 50, (windowHeight/2) + (sin(counter + 3) * 30) );
    text('S', windowWidth/3 + 85, (windowHeight/2) + (sin(counter + 6) * 30) );
    text('H', windowWidth/3 + 125, (windowHeight/2) + (sin(counter + 9) * 30) );
    text('I', windowWidth/3 + 180, (windowHeight/2) + (sin(counter + 12) * 30) );
    text('N', windowWidth/3 + 210, (windowHeight/2) + (sin(counter + 15) *30) );
    text('G', windowWidth/3 + 260, (windowHeight/2) + (sin(counter + 18) * 30) );

    // Draw subtitle
    fill(0);
    textSize(50);
    text("click to start", windowWidth/3, windowHeight/2 + 90);
    // Increase the counter to make the title move
    counter ++;

    // Draw the how to play information
    fill(50);
    textSize(50);
    text("How to play!", windowWidth - 900, windowHeight/3);
    text("* Catch Fish", windowWidth - 900, windowHeight/3 + 60);
    text("* Move hook left and right ", windowWidth - 900, windowHeight/3 + 120);
    text("  with the arrow keys", windowWidth - 900, windowHeight/3 + 180);
    text("* Reel in line by moving mouse", windowWidth - 900, windowHeight/3 + 240);

    // If the mouse is pressed, start the fishing game
    if (mouseIsPressed === true) {
        state = "simulation";
    }
}

function fishingState(){
    isFishCaught();
    move();
    display();
}

function caughtState(){
    // Draw caught fish
    fish.x = windowWidth/3;
    fish.y = windowHeight/3;
    fish.isFacingRight = true;
    drawFish();

    // Draw description
    fill(0);
    textSize(50);
    text("You caught a fish!", windowWidth - 900, windowHeight/3);
    text("* Width: "+fish.w, windowWidth - 900, windowHeight/3 + 60);
    text("* Height: "+fish.h, windowWidth - 900, windowHeight/3 + 120);
    text("* Speed: "+fish.speed, windowWidth - 900, windowHeight/3 + 180);
    text("* Swim: "+fish.swim, windowWidth - 900, windowHeight/3 + 240);
    text("-press Enter to continue-", windowWidth - 900, windowHeight/3 + 300);

    // When enter is pressed, continue fishing
    if(keyIsDown(ENTER)){
        resetFish();
        state = "simulation";
    }
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
    // Reset and randomize the fish
    fish.x = 0 - fish.w;
    fish.y = random(windowHeight/3, windowHeight/2);
    fish.w = random(200, 500);
    fish.fill.r = random(0,255);
    fish.fill.g = random(0,255);
    fish.fill.b = random(0,255);
    fish.swim = random(1,6);
    fish.speed = random(2,10);
    fish.h = fish.w/2;
    fish.isCaught = false;
    lineTension = 0;
}

function drawFish(){    
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
    if(!fish.isCaught){
        fishingLine.y2 ++;
    }
    else{
        // If a fish is caught, lower the tension if we are not pulling
        fishingLine.y2 += fish.speed;
        if(lineTension > 0){
            lineTension --;
        }
    }

    // If the fish is caught, follow the hook
    if(fish.isCaught){
        if(fish.isFacingRight){
            fish.x = fishingLine.x2 - fish.w/2;
        }
        else{
            fish.x = fishingLine.x2 + fish.w/2;
        }
        fish.y = fishingLine.y2 + hookImgSize;
        // Check if the fishing line broke
        if(lineTension >= 100){
            resetFish();
        }
        // Check if the fish went off screen or 
        // was successfully caught
        if(fish.y > windowHeight){
            resetFish();
        }
        else if(fish.y - fish.h/2 < 0){
            state = "caught";
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
    fish.y = fish.y + (sin(counter) * fish.swim);
    counter ++;
}

function mouseMoved(){
    // Raise the fishing line when the mouse is moved
    if(fishingLine.y2 > -100){
        fishingLine.y2 -= fishingLine.speed;
        if(fish.isCaught){
            lineTension += 1.75;
            fishingLine.y2 -= fish.speed;
        }
    } 
}

function display(){
    // If the fish is caught, draw the tension gauge for the line
    if(fish.isCaught){
        fill(0);
        textSize(32);
        textFont('Georgia');
        text('Tension', windowWidth - 400, 50);
        // Change the gauge color based on the line tension
        if(lineTension <= 50){
            fill(58, 235, 52); // green
        }
        else if(lineTension <= 80){
            fill(230, 160, 48); // orange
        }
        else{
            fill(255,0,0); // red
        }
        rect(windowWidth - 400, 75, 300 * lineTension/100, 50);
    }

    // Draw the fish
    drawFish();

    // Draw the fishing line
    stroke(0);
    line(fishingLine.x1, fishingLine.y1, fishingLine.x2, fishingLine.y2);
    noStroke();
    image(hookImg, fishingLine.x2 - hookImgSize/2, fishingLine.y2, hookImgSize, hookImgSize);
}
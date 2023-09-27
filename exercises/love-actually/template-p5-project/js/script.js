/**
 * Love actually
 * Ryan Bujold
 * 
 * A simulation where the thief tries to eat all the cake. The user must
 * protect the cake and push the user out of the screen. 
 */

"use strict";

let canvasWidth = 800;
let canvasHeight = 800;

let thief = {
    x:canvasWidth*(1/3),
    y:canvasHeight/2,
    size:90,
    vx:0,
    vy:0,
    speed:2,
}
let user = {
    x:canvasWidth*(2/3),
    y:canvasHeight/2,
    size:100,
    vx:0,
    vy:0,
    speed:2,
}
let cake = {
    x:canvasWidth/2,
    y:canvasHeight/2,
    size:100,
}
let cakeImg;

let state = "title";
let friction = 0.9;
let timer = 20 * 60;

/**
 * Load files
*/
function preload() {
    cakeImg = loadImage("assets/images/cake.png");
}


/**
 * Setup the canvas
*/
function setup() {
    createCanvas(canvasWidth, canvasHeight);
    noStroke();
}


/**
 * Draw on the canvas every frame
*/
function draw() {
    background(50, 168, 82);
    switch(state){
        case "simulation":
            simulation();
            break;
        case "title":
            title();
            break;
        case "win":
            win();
            break;
        case "lose":
            lose();
            break;
        case "secret":
            secret();
            break;
    }
}

// Move the circles
function move(){
    moveThief();
    moveUser();
}

// Move the opponent
function moveThief(){
    // Randomize the thief's speed horizontally
    let changeX = thief.speed + random(0,5);
    // If the thief is to the right of the cake, move left instead
    if(thief.x > cake.x){
        changeX = -changeX;
    }
    // Randomize the thief's speed vertically
    let changeY = thief.speed + random(0,5);
    // If the thief is below the cake, move up instead
    if(thief.y > cake.y){
        changeY = -changeY;
    }
    // If the thief is going to overlap with the user when it moves, move in the opposite direction
    if(checkOverlap(thief.x + thief.vx + changeX, thief.y + thief.vy + changeY, user.x, user.y, thief.size, user.size)){
        changeX = -changeX;
        changeY = -changeY;
    }
    // Move the thief
    thief.vx += changeX;
    thief.vy += changeY;
    thief.x += thief.vx;
    thief.y += thief.vy;
    // Add friction to the thief's velocity
    thief.vx *= friction;
    thief.vy *= friction;
}

// Move the user
function moveUser(){
    // If the user is to the right of the mouse, move left instead
    let changeX = user.speed;
    if(user.x > mouseX){
        changeX = -changeX;
    }
    // If the user is to the below of the mouse, move up instead
    let changeY = user.speed;
    if(user.y > mouseY){
        changeY = -changeY;
    }
    // Move the user
    user.vx += changeX;
    user.vy += changeY;
    user.x += user.vx;
    user.y += user.vy;
    // Add friction to the user's velocity
    user.vx *= friction;
    user.vy *= friction;
}

// Reduces the size of the cake and returns true when the cake is finished.
function eatCake(){
    cake.size --;
    if(cake.size <= 0){
        return true;
    }
    else{
        return false;
    }
}

// Returns true if the circle is touching an edge of the canvas.
// Otherwise returns false.
function checkOffScreen(x, y, size){
    let radius = size/2;
    if(x + radius > canvasWidth || x < 0){
        return true;
    }
    else if(y + radius > canvasHeight || y < 0){
        return true;
    }
    else{
        return false;
    }
}

// Return true if the circles overlap, otherwise return false.
function checkOverlap(x1, y1, x2, y2, size1, size2){
    let d = dist(x1, y1, x2, y2);
    if(d < (size1/2) + (size2/2)){
        return true;
    }
    else{
        return false;
    }
}

// Draw the circles
function display(){
    // Display the cake
    image(cakeImg, cake.x - cake.size/2, cake.y - cake.size/2, cake.size, cake.size);
    // Display the thief
    fill(0);
    ellipse(thief.x, thief.y, thief.size);
    // Display the user
    fill(255);
    ellipse(user.x, user.y, user.size);
}

// Mouse press logic
function mousePressed(){
    if(state == "title"){
        state = "simulation";
    }
}

// Perform the simulation
function simulation(){
    // Reduce the timer
    timer--;
    // Move logic
    move();
    // State manager
    if(timer < 0){
        // If the timer reaches 0, then change to the secret ending
        state = "secret";
    }
    else if(checkOverlap(thief.x, thief.y, cake.x, cake.y, thief.size, cake.size)){
        // If the cake is completely eaten by the thief, then change to the lose ending
        if(eatCake()){
            state = "lose";
        }
    }
    else if(checkOffScreen(thief.x, thief.y, thief.size)){
        // If the thief is pushed off the screen, then change to the win ending
        state = "win";
    }
    display();
}

// Display the title state
function title(){
    textSize(50);
    fill(255);
    text("Stop the cake thief!\nPush him out of the screen!", 50, canvasHeight/2);
}

// The winning ending
function win(){
    textSize(50);
    fill(237, 64, 231);
    text("You protected the cake!", 50, canvasHeight/2);
    cake.size = 100;
    image(cakeImg, cake.x - cake.size/2, cake.y - cake.size/2 + 200, cake.size, cake.size);
}

// The lossing ending
function lose(){
    textSize(50);
    fill(12, 38, 168);
    text("The thief ate the cake!", 50, canvasHeight/2);
}

// The secret ending
function secret(){
    textSize(50);
    fill(129, 43, 214);
    text("(secret) You shared the cake! :)", 50, canvasHeight/2);
    image(cakeImg, cake.x - cake.size/2, cake.y - cake.size/2 + 200, cake.size, cake.size);
}
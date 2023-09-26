/**
 * Looking for Love
 * Ryan Bujold
 * 
 * Making a simulation of love with randomly moving circles.
 */

"use strict";

let canvasWidth = 800;
let canvasHeight = 800;

let circle1 = {
    x:canvasWidth*(1/3),
    y:canvasHeight/2,
    size:100,
    vx:0,
    vy:0,
    speed:5,
}
let circle2 = {
    x:canvasWidth*(2/3),
    y:canvasHeight/2,
    size:100,
    vx:0,
    vy:0,
    speed:5,
}

let state = "title";

/**
 * Load files
*/
function preload() {

}


/**
 * Setup the canvas
*/
function setup() {
    createCanvas(canvasWidth, canvasHeight);
    noStroke();

    // Randomize the circle's movement directions
    circle1.vx = random(-circle1.speed, circle1.speed);
    circle1.vy = random(-circle1.speed, circle1.speed);
    circle2.vx = random(-circle2.speed, circle2.speed);
    circle2.vy = random(-circle2.speed, circle2.speed);
}


/**
 * Draw on the canvas every frame
*/
function draw() {
    background(0);
    switch(state){
        case "simulation":
            simulation();
            break;
        case "title":
            title();
            break;
        case "love":
            love();
            break;
        case "sadness":
            sadness();
            break;
    }
}

// Move the circles
function move(){
    circle1.x += circle1.vx;
    circle1.y += circle1.vy;
    circle2.x += circle2.vx;
    circle2.y += circle2.vy;
}

// Returns true if the circle is touching an edge of the canvas.
// Otherwise returns false.
function checkOffScreen(x, y, size){
    let radius = size/2;
    if(x + radius > canvasWidth || x < 0){
        state = "sadness";
        return true;
    }
    else if(y + radius > canvasHeight || y < 0){
        state = "sadness";
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
        state = "love";
        return true;
    }
    else{
        return false;
    }
}

// Draw the circles
function display(){
    fill(255);
    ellipse(circle1.x, circle1.y, circle1.size);
    ellipse(circle2.x, circle2.y, circle2.size);
}

// Mouse press logic
function mousePressed(){
    if(state == "title"){
        state = "simulation";
    }
}

// Perform the simulation
function simulation(){
    move();
    if(checkOverlap(circle1.x, circle1.y, circle2.x, circle2.y, circle1.size, circle2.size)){
       // True Love!
    }
    else if(checkOffScreen(circle1.x, circle1.y, circle1.size)){
        // Play the sad ending
    }
    else if (checkOffScreen(circle2.x, circle2.y, circle2.size)){
        // Play the sad ending
    }
    display();
}

// Display the title state
function title(){
    textSize(50);
    fill(255);
    text("LOVE?", windowWidth/3, windowHeight/3);
}

// True love ending
function love(){
    textSize(50);
    fill(237, 64, 231);
    text("LOVE!", windowWidth/3, windowHeight/3);
}

// Sadness ending
function sadness(){
    textSize(50);
    fill(73, 142, 245);
    text("D:", windowWidth/3, windowHeight/3);
}
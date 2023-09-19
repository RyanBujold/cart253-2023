/**
 * Dodging COVID-19
 * Ryan Bujold
 * 
 * A simulation of dodging covid-19
 */

"use strict";

// A covid 19 object
let covid19 = {
    x:0,
    y:250,
    size:100,
    vx:0,
    vy:0,
    speed:5,
    fill:{
        r:255,
        g:0,
        b:0,
    }
}

// A User object
let user = {
    x:0,
    y:0,
    size:100,
    fill:255,
}

// the static amound
let staticAmount = 1000;

/**
 * Description of preload
*/
function preload() {

}


/**
 * Setup our canvas
*/
function setup() {
    createCanvas(windowWidth,windowHeight);
    // Set the covid to a random height
    covid19.y = random(0, height);
    // Change the covids horizontal velocity
    covid19.vx = covid19.speed;
}


/**
 * Draw on the canvas
*/
function draw() {
    background(0,0,0);

    // -- Static --
    for(let i = 0; i < staticAmount; i++){
        let x = random(0,width);
        let y = random(0,height);
        stroke(255,0,0);
        point(x,y);
    }

    // -- User --
    user.x = mouseX;
    user.y = mouseY;
    fill(user.fill);
    ellipse(user.x, user.y, user.size);

    // -- Covid 19 --
    covid19.x += covid19.vx;
    covid19.y += covid19.vy;
    fill(covid19.fill.r, covid19.fill.g, covid19.fill.b);
    noStroke();
    ellipse(covid19.x, covid19.y, covid19.size);
    // If the covid reaches the edge of the screen,
    // reset it back to the left side of the window
    if(covid19.x > width){
        covid19.x = 0;
        covid19.y = random(0, height);
    }

    // -- Collision Checking --
    let d = dist(user.x, user.y, covid19.x, covid19.y);
    if(d < (covid19.size/2) + (user.size/2)){
        noLoop();
    }
}
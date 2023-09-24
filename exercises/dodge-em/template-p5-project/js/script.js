/**
 * Dodg em
 * Ryan Bujold
 * 
 * Dodging objects moving around the canvas. An alien in a ufo dodges
 * asteroids in space.
 * 
 * Image from https://clipart-library.com/clipart/ufo-cliparts_11.htm
 */

"use strict";

// A asteroid 19 object
let asteroid = {
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

// A UFO object
let ufo = {
    x:0,
    y:0,
    size:100,
    fill:255,
    xspeed:0,
    yspeed:0,
}

// A Movement point object
let movePoint = {
    x:0,
    y:0,
    size:5,
    fill: {
        r:255,
        g:255,
        b:0,
    },
    isActive:false
}

// Global variables
let asteroidArray = [asteroid];
let maxAsteroids = 30;
let debrisAmount = 200;
let img;

/**
 * Load the neccessary image files
*/
function preload() {
    img = loadImage('assets/images/Ufo-clipart-clipart.png');
}


/**
 * Setup our canvas and variables
*/
function setup() {
    createCanvas(windowWidth,windowHeight);
    noStroke();

    // Set the asteroid to a random height
    asteroid.y = random(0, height);
    // Change the asteroids horizontal velocity
    asteroid.vx = asteroid.speed;
}


/**
 * Draw on the canvas
*/
function draw() {
    background(0,0,0);

    // -- Mouse Click --
    // If the mouse is clicked, make that location the movement point
    if(mouseIsPressed === true){
        movePoint.x = mouseX;
        movePoint.y = mouseY;
        movePoint.isActive = true;
        ufo.xspeed = (movePoint.x - ufo.x) /60;
        ufo.yspeed = (movePoint.y - ufo.y) /60;
    }

    // -- Debris --
    // Draw a debris trail behind each asteroid
    asteroidArray.forEach(function(currentValue){
        let asteroid = currentValue;
        for(let i = 0; i < debrisAmount; i++){
            let x = random(0,asteroid.x);
            let y = random(asteroid.y-asteroid.size/2, asteroid.y+asteroid.size/2);
            stroke(asteroid.fill.r, asteroid.fill.g, asteroid.fill.b);
            point(x,y);
        }
    });
    noStroke();

    // -- UFO --
    // If a movement point is active, move the ufo there
    if(movePoint.isActive){
        // Draw the movement point
        fill(movePoint.fill.r, movePoint.fill.g, movePoint.fill.b);
        ellipse(movePoint.x, movePoint.y, movePoint.size);

        // If the ufo has reached the movepoint, stop moving and deactivate the movepoint
        if(ufo.x == movePoint.x && ufo.y == movePoint.y){
            movePoint.isActive = false;
        }
        else {
            // If the ufo is to the left of the move point, move it right
            if(ufo.x < movePoint.x){
                ufo.x += ufo.xspeed;
                // If the ufo has advanced past the move point, move it to the move point
                if(ufo.x > movePoint.x){
                    ufo.x = movePoint.x;
                }
            }
            // If the ufo is to the right of the move point, move it left
            if(ufo.x > movePoint.x){
                ufo.x += ufo.xspeed;
                // If the ufo has advanced past the move point, move it to the move point
                if(ufo.x < movePoint.x){
                    ufo.x = movePoint.x;
                }
            }
            // If the ufo is above the move point, move it down
            if(ufo.y < movePoint.y){
                ufo.y += ufo.yspeed;
                // If the ufo has advanced past the move point, move it to the move point
                if(ufo.y > movePoint.y){
                    ufo.y = movePoint.y;
                }
            }
            // If the ufo is below the move point, move it up
            if(ufo.y > movePoint.y){
                ufo.y += ufo.yspeed;
                // If the ufo has advanced past the move point, move it to the move point
                if(ufo.y < movePoint.y){
                    ufo.y = movePoint.y;
                }
            }
        }
    }
    // Draw the ufo
    image(img, ufo.x - ufo.size/2, ufo.y - ufo.size/2, ufo.size, ufo.size);

    // -- Asteroid --
    // Perform logic for every asteroid
    asteroidArray.forEach(function(currentValue){
        let asteroid = currentValue;

        // -- Collision Checking --
        let d = dist(ufo.x, ufo.y, asteroid.x, asteroid.y);
        if(d < (asteroid.size/2) + (ufo.size/2)){
            noLoop();
        }

        asteroid.x += asteroid.vx;
        asteroid.y += asteroid.vy;
        fill(asteroid.fill.r, asteroid.fill.g, asteroid.fill.b);
        ellipse(asteroid.x, asteroid.y, asteroid.size);
        // If the asteroid reaches the edge of the screen,
        // reset it back to the left side of the window
        if(asteroid.x > width){
            asteroid.x = 0;
            asteroid.y = random(0, height);
            //Add a new asteroid to the array if it doesn't reach the max asteroid amount
            if(asteroidArray.length < maxAsteroids){
                let temp = {
                    x:0,
                    y:random(0, height),
                    size:random(20,150),
                    vx:0,
                    vy:0,
                    speed:random(1,8),
                    fill:{
                        r:random(0,255),
                        g:random(0,255),
                        b:random(0,255),
                    }
                }
                temp.vx = temp.speed;
                asteroidArray.push(temp);
    
                // Make the ufo smaller for every additional asteroid
                ufo.size -= 1;
                ufo.size = constrain(ufo.size, 1, 100);
            }
            
        }
    });
    
}
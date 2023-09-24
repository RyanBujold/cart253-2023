/**
 * Dodg em
 * Ryan Bujold
 * 
 * Dodging objects moving around the canvas.
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

let covidArray = [covid19];
let maxCovid = 50;

// A User object
let user = {
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

// the static amound
let staticAmount = 50;

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
    noStroke();
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

    // -- Mouse Click --
    if(mouseIsPressed === true){
        movePoint.x = mouseX;
        movePoint.y = mouseY;
        movePoint.isActive = true;
        user.xspeed = (movePoint.x - user.x) /60;
        user.yspeed = (movePoint.y - user.y) /60;
    }

    // -- Static --
    // Draw a static trail behind each covid
    covidArray.forEach(function(currentValue){
        let covid = currentValue;
        for(let i = 0; i < staticAmount; i++){
            let x = random(0,covid.x);
            let y = random(covid.y-covid.size/2, covid.y+covid.size/2);
            stroke(255,0,0);
            point(x,y);
        }
    });

    // -- User --
    // If a movement point is active, move the user there
    if(movePoint.isActive){
        // Draw the movement point
        fill(movePoint.fill.r, movePoint.fill.g, movePoint.fill.b);
        ellipse(movePoint.x, movePoint.y, movePoint.size);

        // If the user has reached the movepoint, stop moving and deactivate the movepoint
        if(user.x == movePoint.x && user.y == movePoint.y){
            movePoint.isActive = false;
        }
        else {
            // If the user is to the left of the move point, move it right
            if(user.x < movePoint.x){
                user.x += user.xspeed;
                // If the user has advanced past the move point, move it to the move point
                if(user.x > movePoint.x){
                    user.x = movePoint.x;
                }
            }
            // If the user is to the right of the move point, move it left
            if(user.x > movePoint.x){
                user.x += user.xspeed;
                // If the user has advanced past the move point, move it to the move point
                if(user.x < movePoint.x){
                    user.x = movePoint.x;
                }
            }
            // If the user is above the move point, move it down
            if(user.y < movePoint.y){
                user.y += user.yspeed;
                // If the user has advanced past the move point, move it to the move point
                if(user.y > movePoint.y){
                    user.y = movePoint.y;
                }
            }
            // If the user is below the move point, move it up
            if(user.y > movePoint.y){
                user.y += user.yspeed;
                // If the user has advanced past the move point, move it to the move point
                if(user.y < movePoint.y){
                    user.y = movePoint.y;
                }
            }
        }
    }
    // Draw the user
    fill(user.fill);
    ellipse(user.x, user.y, user.size);

    // -- Covid 19 --
    // Perform logic for every covid 19
    covidArray.forEach(function(currentValue){

        let covid = currentValue;

        // -- Collision Checking --
        let d = dist(user.x, user.y, covid.x, covid.y);
        if(d < (covid.size/2) + (user.size/2)){
            noLoop();
        }

        covid.x += covid.vx;
        covid.y += covid.vy;
        fill(covid.fill.r, covid.fill.g, covid.fill.b);
        noStroke();
        ellipse(covid.x, covid.y, covid.size);
        // If the covid reaches the edge of the screen,
        // reset it back to the left side of the window
        if(covid.x > width){
            covid.x = 0;
            covid.y = random(0, height);
            //Add a new covid to the array if it doesn't reach the max covid amount
            if(covidArray.length < maxCovid){
                let temp = {
                    x:0,
                    y:random(0, height),
                    size:random(20,150),
                    vx:0,
                    vy:0,
                    speed:random(1,8),
                    fill:{
                        r:255,
                        g:0,
                        b:0,
                    }
                }
                temp.vx = temp.speed;
                covidArray.push(temp);
    
                // Make the user smaller for every additional covid
                user.size -= 1;
                user.size = constrain(user.size, 1, 100);
            }
            
        }
    });
    
}
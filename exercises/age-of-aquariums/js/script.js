/**
 * The Age of Aquariums
 * Ryan Bujold
 * 
 * Making an ant hill simulation.
 */

"use strict";
let canvasWidth = 1000;
let canvasHeight = 800;

let group = [];
let startGroupSize = 5;
let foods = [];
let queenAnt = {
    x: 200,
    y: canvasHeight - 200,
    size: 10,
    speed: 0.5,
}
let newAntAmount = 0;
let foodTimer = {
    limit: 60,
    count: 0,
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);

    for (let i = 0; i < startGroupSize; i++) {
        // Create an ant
        let ant = createAnt(queenAnt.x, queenAnt.y);
        // Add the ant to our array
        group.push(ant);
    }
}

// Creates a new JavaScript Object describing an ant and returns it
function createAnt(x, y) {
    let ant = {
        x: x,
        y: y,
        size: 5,
        vx: 0,
        vy: 0,
        speed: 2,
        smell: 150,
        hasFood: false,
        food: {},
    };
    return ant;
}

// Creates a new JavaScript Object describing a food object and returns it
function createFood(x, y) {
    let food = {
        x: x,
        y: y,
        size: Math.round(random(5, 10)),
        fill: {
            r: random(0, 255),
            g: random(0, 255),
            b: random(0, 255),
        },
        isPickedUp: false,
    }
    return food;
}

// Moves and displays our ant
function draw() {
    background(200);

    // Update  home
    userArrowControls();
    push();
    fill(100);
    noStroke();
    ellipse(queenAnt.x, queenAnt.y, queenAnt.size);
    pop();

    // Update the foods
    for (let i = 0; i < foods.length; i++) {
        displayFood(foods[i]);
    }

    // Update the ants
    for (let i = 0; i < group.length; i++) {
        moveAnt(group[i]);
        displayAnt(group[i]);
        foodBroughtHome(group[i]);
    }

    // Add new ants then reset the counter
    for (let i = 0; i < newAntAmount; i++) {
        let ant = createAnt(queenAnt.x, queenAnt.y);
        group.push(ant);
    }
    newAntAmount = 0;

    // Add new foods overtime
    if (foodTimer.count >= foodTimer.limit) {
        let food = createFood(random(0,canvasWidth), random(0,canvasHeight));
        foods.push(food);
        foodTimer.count = 0;
    }
    foodTimer.count ++;
}

// Checks if the food was brought by the ant back home
function foodBroughtHome(ant) {
    // Check if the ant is close to home
    if (dist(ant.x, ant.y, queenAnt.x, queenAnt.y) < queenAnt.size && ant.hasFood) {
        // Drop off the food
        let index = foods.indexOf(ant.food);
        foods.splice(index, 1);
        ant.hasFood = false;
        // Add a new ant
        newAntAmount++;
    }
}

// Chooses whether the provided ant changes direction and moves it
function moveAnt(ant) {
    // Choose whether to change direction
    let change = random(0, 1);
    if (change < 0.05) {
        ant.vx = random(-ant.speed, ant.speed);
        ant.vy = random(-ant.speed, ant.speed);
    }
    // Randomly move towards nearby food
    if (change > 0.90) {
        let pos = {
            x: 0,
            y: 0,
        };
        for (let f = 0; f < foods.length; f++) {
            // If there is nearby, unpicked up food, go towards it
            if (foods.length > 0 && dist(ant.x, ant.y, foods[f].x, foods[f].y) < ant.smell && !foods[f].isPickedUp && !ant.hasFood) {
                // Check if the ant has picked up food
                if (dist(ant.x, ant.y, foods[f].x, foods[f].y) < foods[f].size + 10) {
                    foods[f].isPickedUp = true;
                    ant.hasFood = true;
                    ant.food = foods[f];
                } else {
                    pos.x = foods[f].x;
                    pos.y = foods[f].y;
                }
            }
            // If the food is picked up by the ant, move towards home
            else if (ant.hasFood && ant.food === foods[f] && foods[f].isPickedUp) {
                pos.x = queenAnt.x;
                pos.y = queenAnt.y;
            }
        }

        // If we are given a position then...
        if (pos.x != 0 || pos.y != 0) {
            // Move towards the desired location
            if (ant.x < pos.x) {
                ant.vx = random(0, ant.speed);
            }
            else {
                ant.vx = random(-ant.speed, 0);
            }
            if (ant.y < pos.y) {
                ant.vy = random(0, ant.speed);
            }
            else {
                ant.vy = random(-ant.speed, 0);
            }
        }
    }

    // Move the ant
    ant.x = ant.x + ant.vx;
    ant.y = ant.y + ant.vy;

    // Constrain the ant to the canvas
    ant.x = constrain(ant.x, 0, width);
    ant.y = constrain(ant.y, 0, height);

    // Move the food with the ant
    if (ant.hasFood) {
        ant.food.x = ant.x;
        ant.food.y = ant.y - 5;
    }
}

// Displays the provided ant on the canvas
function displayAnt(ant) {
    push();
    fill(0);
    noStroke();
    ellipse(ant.x, ant.y, ant.size);
    pop();
}

// Displays the provided food on the canvas
function displayFood(food) {
    push();
    fill(food.fill.r, food.fill.g, food.fill.b);
    noStroke();
    ellipse(food.x, food.y, food.size);
    pop();
}

// Allow the user to control with the arrow keys
function userArrowControls() {
    if (keyIsDown(LEFT_ARROW)) {
        queenAnt.x -= queenAnt.speed;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        queenAnt.x += queenAnt.speed;
    }

    if (keyIsDown(UP_ARROW)) {
        queenAnt.y -= queenAnt.speed;
    }

    if (keyIsDown(DOWN_ARROW)) {
        queenAnt.y += queenAnt.speed;
    }
}
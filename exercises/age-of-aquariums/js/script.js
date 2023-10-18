/**
 * The Age of Aquariums
 * Ryan Bujold
 * 
 * Making an ant hill simulation.
 */

"use strict";

let group = [];
let groupSize = 100;
let foods = [];

function setup() {
    createCanvas(1000, 800);

    for (let i = 0; i < groupSize; i++) {
        // Create an ant
        let ant = createAnt(random(0, width), random(0, height));
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
        smell: 100,
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
            b: random(0, 255)
        }
    }
    return food;
}

// Moves and displays our ant
function draw() {
    background(200);

    // Update the foods
    for (let i = 0; i < foods.length; i++) {
        displayFood(foods[i]);
    }

    // Update the ants
    for (let i = 0; i < group.length; i++) {
        moveAnt(group[i]);
        displayAnt(group[i]);
    }
}

// Chooses whether the provided ant changes direction and moves it
function moveAnt(ant) {
    // Check if the ant has picked up food
    if (foods.length > 0 && dist(ant.x, ant.y, foods[0].x, foods[0].y) < 5) {
        ant.hasFood = true;
        ant.food = foods[0];
    }

    // Choose whether to change direction
    let change = random(0, 1);
    if (change < 0.05) {
        ant.vx = random(-ant.speed, ant.speed);
        ant.vy = random(-ant.speed, ant.speed);
    }
    // Randomly move towards nearby food
    if (change > 0.95 && foods.length > 0 &&
        dist(ant.x, ant.y, foods[0].x, foods[0].y) < ant.smell) {
        let pos = {
            x: 0,
            y: 0,
        };
        if (!ant.hasFood) {
            pos.x = foods[0].x;
            pos.y = foods[0].y;
        }
        else {
            pos.x = 0;
            pos.y = 0;
        }

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

function mousePressed() {
    // When the mouse is clicked, create a food object
    let food = createFood(mouseX, mouseY);
    // Add the food to the foods array
    foods.push(food);
}
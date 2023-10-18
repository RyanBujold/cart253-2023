/**
 * The Age of Aquariums
 * Ryan Bujold
 * 
 * Making an ant hill simulation.
 */

"use strict";

let group = [];
let groupSize = 100;

function setup() {
    createCanvas(600, 600);

    for (let i = 0; i < groupSize; i++) {
        // Create an ant
        let ant = createAnt(random(0, width), random(0, height));
        // Add the ant to our array
        group.push(ant);
    }
}

// Creates a new JavaScript Object describing a ant and returns it
function createAnt(x, y) {
    let ant = {
        x: x,
        y: y,
        size: 5,
        vx: 0,
        vy: 0,
        speed: 2
    };
    return ant;
}

// Moves and displays our ant
function draw() {
    background(200);

    for (let i = 0; i < group.length; i++) {
        moveAnt(group[i]);
        displayAnt(group[i]);
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

    // Move the ant
    ant.x = ant.x + ant.vx;
    ant.y = ant.y + ant.vy;

    // Constrain the ant to the canvas
    ant.x = constrain(ant.x, 0, width);
    ant.y = constrain(ant.y, 0, height);
}

// Displays the provided ant on the canvas
function displayAnt(ant) {
    push();
    fill(0);
    noStroke();
    ellipse(ant.x, ant.y, ant.size);
    pop();
}

function mousePressed() {
    // Create a ant at the mouse position
    let ant = createAnt(mouseX, mouseY); 
    // Add the ant to our array
    group.push(ant);
}
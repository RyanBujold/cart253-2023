/**
 * The Age of Aquariums
 * Ryan Bujold
 * 
 * Making an ant hill simulation.
 * Spider image is from:
 * https://www.svgheart.com/product/spider-silhouette-halloween-svg-file-3/ 
 */

"use strict";
let canvasWidth = 1000;
let canvasHeight = 800;

let ants = [];
let startGroupSize = 5;
let foods = [];
let spiders = [];
let deadSpiders = [];
let spiderImg;
let spiderTimer = {
    limit: 600,
    count: 0,
}
let queenAnt = {
    x: 200,
    y: canvasHeight - 200,
    size: 10,
    speed: 0.5,
}
let newAntAmount = 0;
let foodTimer = {
    limit: 180,
    count: 0,
}
let winAmount = 30;
let state = "simulation";

// Load files
function preload() {
    spiderImg = loadImage('assets/images/spider.png');
}

// Setup objects and the canvas
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    for (let i = 0; i < startGroupSize; i++) {
        // Create an ant
        let ant = createAnt(queenAnt.x, queenAnt.y);
        // Add the ant to our array
        ants.push(ant);
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

// Creates a new JavaScript Object describing a spider object and returns it
function createSpider(x, y) {
    let spider = {
        x: x,
        y: y,
        rotation: 0,
        size: random(50, 150),
        speed: random(1, 1.5),
        health: Math.round(random(1,3)),
    }
    return spider;
}

// Moves and displays our ant
function draw() {
    background(200);

    switch (state) {
        case "simulation":
            simulationState();
            break;
        case "win":
            winState();
            break;
        case "lose":
            loseState();
            break;
    }
}

function simulationState() {
    // Update queen ant
    moveQueenAnt();
    displayQueenAnt();

    // Update the foods
    for (let i = 0; i < foods.length; i++) {
        displayFood(foods[i]);
    }

    // Update the ants
    for (let i = 0; i < ants.length; i++) {
        moveAnt(ants[i]);
        displayAnt(ants[i]);
        feedQueen(ants[i]);
    }

    // Update the spiders
    for (let i = 0; i < spiders.length; i++) {
        moveSpider(spiders[i]);
        displaySpider(spiders[i]);
        attackAnts(spiders[i]);
        attackQueen(spiders[i]);
        // If the spider runs out of health, remove it
        if (spiders[i].health <= 0) {
            deadSpiders.push(i);
        }
    }

    // Add new ants then reset the counter
    for (let i = 0; i < newAntAmount; i++) {
        let ant = createAnt(queenAnt.x, queenAnt.y);
        ants.push(ant);
    }
    newAntAmount = 0;

    // Add new foods overtime
    if (foodTimer.count >= foodTimer.limit) {
        let food = createFood(random(0, canvasWidth), random(0, canvasHeight));
        foods.push(food);
        foodTimer.count = 0;
    }
    foodTimer.count++;

    // Add new spiders overtime
    if (spiderTimer.count >= spiderTimer.limit) {
        let spider = createSpider(random(0, canvasWidth), 0);
        spiders.push(spider);
        spiderTimer.count = 0;
    }
    spiderTimer.count++;

    // Get rid of any dead spiders
    for (let s = 0; s < deadSpiders.length; s++) {
        spiders.splice(deadSpiders[s], 1);
    }
    // Make sure to reset the list of dead spiders or else it will create problems
    deadSpiders = [];

    // If we reach the winning amount of ants, we win
    if (ants.length >= winAmount) {
        state = "win";
    }
    else if(ants.length <= 0){
        state = "lose";
    }
}

function winState() {
    background(33, 120, 4);
    textSize(32);
    text('The ants have succeeded!', 10, 30);
}

function loseState() {
    background(117, 25, 7);
    textSize(32);
    text('The spiders have won...', 10, 30);
}

// Checks if the food was brought by the ant queen
function feedQueen(ant) {
    // Check if the ant is close to queen ant
    if (dist(ant.x, ant.y, queenAnt.x, queenAnt.y) < queenAnt.size && ant.hasFood) {
        // Drop off the food
        let index = foods.indexOf(ant.food);
        foods.splice(index, 1);
        ant.hasFood = false;
        // Add a new ant
        newAntAmount++;
        // Make the queen grow in size and slow down
        queenAnt.size++;
        queenAnt.speed-=0.005;
    }
}

// Check if the spider is close enought to attack an ant
function attackAnts(spider) {
    for (let i = 0; i < ants.length; i++) {
        if (dist(ants[i].x, ants[i].y, spider.x, spider.y) < ants[i].size + spider.size) {
            // Remove the ant
            ants[i].food.isPickedUp = false;
            let index = ants.indexOf(ants[i]);
            ants.splice(index, 1);
            // Reduce the spider's health
            spider.health--;
        }
    }
}

// Check if the spider is close enought to attack the queen
function attackQueen(spider) {
    if(dist(spider.x, spider.y, queenAnt.x, queenAnt.y) < spider.size + queenAnt.size){
        state = "lose";
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
            // If the food is picked up by the ant, move towards the queen ant
            else if (ant.hasFood && ant.food === foods[f] && foods[f].isPickedUp) {
                pos.x = queenAnt.x;
                pos.y = queenAnt.y;
            }
        }

        // If the user presses the mouse, have the ants move towards that location
        if (mouseIsPressed === true) {
            pos.x = mouseX;
            pos.y = mouseY;
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

// Displays the provided queen ant on the canvas
function displayQueenAnt() {
    push();
    fill(100);
    noStroke();
    ellipse(queenAnt.x, queenAnt.y, queenAnt.size);
    pop();
}

// Allow the user to control with the arrow keys
function moveQueenAnt() {
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

    // Constrain the queen ant to the canvas
    queenAnt.x = constrain(queenAnt.x, 0, width);
    queenAnt.y = constrain(queenAnt.y, 0, height);
}

// Move the given spider 
function moveSpider(spider) {
    // Randomly rotate the spider's direction
    let change = random(0, 1);
    if (change < 0.01 && spider.rotation < 360) {
        spider.rotation += 90;
    }
    else if (change > 0.99 && spider.rotation > -360) {
        spider.rotation -= 90;
    }

    // Move the spider in the direction it is facing
    if (spider.rotation == -360 || spider.rotation == 360) {
        spider.y -= spider.speed;
    }
    else if (spider.rotation == 90 || spider.rotation == -270) {
        spider.x += spider.speed;
    }
    else if (spider.rotation == 180 || spider.rotation == -180) {
        spider.y += spider.speed;
    }
    else if (spider.rotation == 270 || spider.rotation == -90) {
        spider.x -= spider.speed;
    }

    // Constrain the spider to the canvas
    spider.x = constrain(spider.x, 0, width);
    spider.y = constrain(spider.y, 0, height);

}

// Displays the provided spider on the canvas
function displaySpider(spider) {
    push();
    imageMode(CENTER);
    angleMode(DEGREES);
    translate(spider.x, spider.y);
    rotate(spider.rotation);
    image(spiderImg, 0, 0, spider.size, spider.size);
    pop();
}
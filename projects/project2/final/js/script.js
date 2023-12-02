/**
 * Final Project - Dark House
 * Ryan Bujold
 * 
 * A top down survival shooter using a flashlight to light your way and survive enemies.
 * 
 * Help with shadows programming from this video: https://www.youtube.com/watch?v=HizBndP0YEE
 */

// TODO add lightning that shows the cool shadows and stuff idk...

"use strict";

let canvasWidth = 1600
let canvasHeight = 800;

let user;
let walls = [
    // Border walls
    new Wall(0, 0, 50, canvasHeight),
    new Wall(0, 0, canvasWidth, 50),
    new Wall(canvasWidth - 50, 0, 50, canvasHeight),
    new Wall(0, canvasHeight - 50, canvasWidth, 50),
    // Top left room
    new Wall(300, 50, 250, 100),
    new Wall(300, 250, 50, 100),
    // Left middle hallway intersection
    new Wall(50, 350, 50, 200),
    new Wall(200, 350, 150, 50),
    new Wall(200, 500, 150, 50),
    // Bottom left room
    new Wall(350, 700, 200, 50),
    new Wall(350, 500, 200, 100),
    // Bottom hallway
    new Wall(650, 500, 500, 100),
    new Wall(650, 700, 500, 50),
    // Middle Room
    new Wall(350, 250, 300, 50),
    new Wall(750, 250, 300, 50),
    new Wall(900, 300, 250, 200),
    // Bottom Right room
    new Wall(1150, 500, 300, 50),
    // Right top and middle room
    new Wall(1150, 200, 150, 300),
    new Wall(1150, 50, 150, 50),
    // Top room
    new Wall(800, 50, 100, 100),
    new Wall(1000, 150, 50, 100),
];
let enemies = [
    //new Enemy(100, 700, walls, true),
];
let spawnTimer = {
    limit: 300,
    count: 0,
};
let points = 0;

let state = "main";

function preload() {

}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    angleMode(DEGREES);
    noStroke();

    // Initialize objects
    user = new User(650, 100, walls);
}

function draw() {

    switch (state) {
        case "main":
            mainState();
            break;
        case "lose":
            loseState();
            break;
    }
}

function mainState() {
    background(0);

    // Move the user
    user.move();
    user.display();
    user.updateBullets(enemies);
    if (user.checkDefeat()) {
        state = "lose";
        return;
    }

    // Draw the user's flashlight
    user.displayFlashlight();

    // Move the enemies
    for (let i = 0; i < enemies.length; i++) {
        if (!enemies[i].isAlive) {
            // Remove the element from the array
            enemies.splice(i, 1);
            points += 10;
            continue;
        }
        enemies[i].move(user);
        enemies[i].display(user);
    }

    // Update and draw the walls
    for (let i = 0; i < walls.length; i++) {
        walls[i].update(user);
        walls[i].display();
    }

    // Update our spawner
    spawnTimer.count++;
    if (spawnTimer.count >= spawnTimer.limit) {
        spawnEnemmy();
        spawnTimer.count = 0;
    }

    // Show the number of enemies
    fill(255);
    text("Hazard Level: " + enemies.length, 50, 50);
    text("Score: " + points, 50, 70);
}

function loseState() {
    background(0);
    fill(255);
    text("Game Over!", canvasWidth / 2, canvasHeight / 2 - 40);
    text("Final Score: " + points, canvasWidth / 2, canvasHeight / 2 - 20);
    text("Final Hazard Level: " + enemies.length, canvasWidth / 2, canvasHeight / 2);
}

function spawnEnemmy() {
    let num = round(random(0, 3));
    switch (num) {
        case 0:
            enemies.push(new Enemy(100, 700, walls));
            break;
        case 1:
            enemies.push(new Enemy(100, 100, walls));
            break;
        case 2:
            enemies.push(new Enemy(1500, 100, walls));
            break;
        case 3:
            enemies.push(new Enemy(1500, 700, walls));
            break;
    }
}
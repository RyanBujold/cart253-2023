/**
 * Final Project - Dark House
 * Ryan Bujold
 * 
 * A top down survival shooter using a flashlight to light your way and survive enemies.
 * 
 * Help with shadows programming from this video: https://www.youtube.com/watch?v=HizBndP0YEE
 */

"use strict";

let canvasWidth = 1600
let canvasHeight = 800;

let user;
let walls = [
    new Wall(0, 0, 50, canvasHeight),
    new Wall(0, 0, canvasWidth, 50),
    new Wall(canvasWidth - 50, 0, 50, canvasHeight),
    new Wall(0, canvasHeight - 50, canvasWidth, 50),
    new Wall(50, 50, 200, 400),
    new Wall(250, 50, 1000, 50),
    new Wall(550, 100, 50, 100),
    new Wall(550, 300, 50, 100),
];
let enemies = [
    new Enemy(500,500,walls),
]

function preload() {

}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    angleMode(DEGREES);
    noStroke();

    // Initialize objects
    user = new User(canvasWidth / 2, canvasHeight / 2, walls);

}

function draw() {
    background(0);

    // Move the user
    user.move();
    user.display();

    // Move the enemies
    for(let i = 0; i < enemies.length; i++){
        enemies[i].move(user);
        enemies[i].display();
    }

    // Draw a gray box 
    //fill(50);
    //rect(600, 100, 100, 100);

    // Draw the user's flashlight
    user.displayFlashlight();

    // Draw circle
    //let shade = map(dist(1000, 500, user.x, user.y), 0, 500, 200, 50);
    //fill(shade);
    //ellipse(900, 500, 50);

    // Update and draw the walls
    for (let i = 0; i < walls.length; i++) {
        walls[i].update(user);
        walls[i].display();
    }

}
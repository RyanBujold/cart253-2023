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
    new Wall(300, 300, 200, 200),
    new Wall(1000, 200, 200, 400),
];

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

    // Draw a gray box 
    fill(50);
    rect(600, 100, 100, 100);

    // Draw the user's flashlight
    user.displayFlashlight();

    // Draw circle
    let shade = map(dist(1000, 500, user.x, user.y), 0, 500, 200, 50);
    fill(shade);
    ellipse(900, 500, 50);

    // Update and draw the walls
    for (let i = 0; i < walls.length; i++) {
        walls[i].update(user);
        walls[i].display();
    }

}
/**
 * Prototype - Project 2
 * Ryan Bujold
 * 
 * A prototype of a top down survival shooter using a flashlight to light your way.
 */

"use strict";

let canvasWidth = 1600
let canvasHeight = 800;

let user;

function preload() {

}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    angleMode(DEGREES);
    noStroke();

    // Initialize the user
    user = new User(canvasWidth / 2, canvasHeight / 2);
}

function draw() {
    background(0);

    // Move the user
    user.move();

    // Draw the user
    user.display();

    // Draw a gray box 
    fill(50);
    rect(600, 100, 100, 100);

    // Draw the user's flashlight
    user.displayFlashlight();

    // Draw a black box
    fill(0);
    rect(300, 300, 200, 200);

    // Draw circle
    let shade = map(dist(1000, 500, user.x, user.y), 0, 500, 200, 50);
    fill(shade);
    ellipse(1000, 500, 50);

}
/**
 * Prototype - Project 2
 * Ryan Bujold
 * 
 * A prototype of a top down survival shooter using a flashlight to light your way.
 * 
 * Help with shadows programming from this video: https://www.youtube.com/watch?v=HizBndP0YEE
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
    //user = new User(0,0);
}

function draw() {
    background(200);

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

    // Draw the box's shadow
    let cx = 500;
    let cy = 300;
    let hoff = 100;
    let hx = map(user.x, cx-canvasWidth, cx+canvasWidth, -hoff, hoff);
    let hy = map(user.y, cy-canvasHeight, cy+canvasHeight, -hoff, hoff);
    let shadow = 100;
    let sx = hx*-shadow;
    let sy = hy*-shadow;
    stroke(0, 0, 255);
    line(500, 300, cx+sx, cy+sy);
    noStroke();
}
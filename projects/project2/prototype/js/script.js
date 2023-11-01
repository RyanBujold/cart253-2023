/**
 * Prototype - Project 2
 * Ryan Bujold
 * 
 * TODO add a description of the project/prototype.
 */

"use strict";

let canvasWidth = 1600
let canvasHeight = 800;

let user = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    rotation: 0,
    size: 50,
}

let box = {
    x: 300,
    y: 300,
    w: 200,
    h: 200,
}

function preload() {

}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(0);

    // Draw the user
    fill(200, 0, 0);
    ellipse(user.x, user.y, user.size);
    // Draw a pointer for the direction the user is facing
    stroke(0, 200, 0)
    line(user.x, user.y, user.x, user.y - 25);
    noStroke();

    // Draw a box
    fill(200);
    rect(box.x, box.y, box.w, box.y);
}
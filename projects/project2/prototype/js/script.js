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
    sight: {
        range: 45,
        distance: 500,
    }
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
    angleMode(DEGREES);
}

function draw() {
    background(0);

    // Move the user
    moveUser();
    // Draw the user's sight
    fill(0, 0, 200);
    triangle(user.x, user.y, 
        user.x - sin(user.rotation + user.sight.range) * user.sight.distance, user.y - cos(user.rotation + user.sight.range) * user.sight.distance, 
        user.x - sin(user.rotation - user.sight.range) * user.sight.distance, user.y - cos(user.rotation - user.sight.range) * user.sight.distance);
    // Draw the user
    fill(200, 0, 0);
    ellipse(user.x, user.y, user.size);
    // Draw a pointer for the direction the user is facing
    stroke(0, 200, 0);
    line(user.x, user.y, user.x - sin(user.rotation) * 50, user.y - cos(user.rotation) * 50);
    noStroke();

    // Draw a box
    fill(200);
    rect(box.x, box.y, box.w, box.y);
}

function moveUser() {
    // Rotate the user right or left
    if (keyIsDown(LEFT_ARROW)) {
        user.rotation += 1;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        user.rotation -= 1;
    }
}
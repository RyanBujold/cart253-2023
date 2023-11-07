/**
 * Prototype - Project 2
 * Ryan Bujold
 * 
 * A prototype of a top down survival shooter using a flashlight to light your way.
 */

"use strict";

let canvasWidth = 1600
let canvasHeight = 800;

let user = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    rotation: 0,
    size: 50,
    flashlight: {
        range: 30,
        distance: 1000,
    },
    moveSpeed: 3,
    turnSpeed: 1.5,
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
    // Draw the user
    fill(200, 0, 0);
    ellipse(user.x, user.y, user.size);
    // Draw a pointer for the direction the user is facing
    stroke(0, 200, 0);
    line(user.x, user.y, user.x - sin(user.rotation) * 50, user.y - cos(user.rotation) * 50);
    noStroke();

    // Draw a gray box 
    fill(50);
    rect(600, 100, 100, 100);

    // Draw the user's sight
    fill(255, 255, 255, 50);
    let leftSightPoint = {
        x: user.x - sin(user.rotation + user.flashlight.range) * user.flashlight.distance,
        y: user.y - cos(user.rotation + user.flashlight.range) * user.flashlight.distance,
    }
    let rightSightPoint = {
        x: user.x - sin(user.rotation - user.flashlight.range) * user.flashlight.distance,
        y: user.y - cos(user.rotation - user.flashlight.range) * user.flashlight.distance,
    }
    triangle(user.x, user.y, leftSightPoint.x, leftSightPoint.y, rightSightPoint.x, rightSightPoint.y);

    // Draw a black box
    fill(0);
    rect(300, 300, 200, 200);

    // Draw circle
    let shade = map(dist(1000, 500, user.x, user.y), 0, 500, 200, 50);
    fill(shade);
    ellipse(1000, 500, 50);

}

function moveUser() {
    // Rotate the user right or left
    if (keyIsDown(LEFT_ARROW)) {
        user.rotation += user.turnSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        user.rotation -= user.turnSpeed;
    }
    // Move forward and backwards
    if (keyIsDown(UP_ARROW)) {
        user.x -= sin(user.rotation) * user.moveSpeed;
        user.y -= cos(user.rotation) * user.moveSpeed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        user.x += sin(user.rotation) * user.moveSpeed;
        user.y += cos(user.rotation) * user.moveSpeed;
    }
}
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
    let s1 = drawShadow(300, 300);
    let s2 = drawShadow(500, 300);
    let s3 = drawShadow(300, 500);
    let s4 = drawShadow(500, 500);

    // Shadow top
    fill(0,200,0);
    beginShape();
    vertex(300, 300);
    vertex(s1.x, s1.y);
    vertex(s2.x, s2.y);
    vertex(500, 300);
    endShape(CLOSE);
    // Shadow left
    fill(200,0,0);
    beginShape();
    vertex(300, 300);
    vertex(s1.x, s1.y);
    vertex(s3.x, s3.y);
    vertex(300, 500);
    endShape(CLOSE);
    // Shadow right
    fill(0,0,200);
    beginShape();
    vertex(300, 500);
    vertex(s3.x, s3.y);
    vertex(s4.x, s4.y);
    vertex(500, 500);
    endShape(CLOSE);
    // Shadow bottom
    fill(0,200,200);
    beginShape();
    vertex(500, 500);
    vertex(s4.x, s4.y);
    vertex(s2.x, s2.y);
    vertex(500, 300);
    endShape(CLOSE);

}

function drawShadow(cx, cy) {
    let hoff = 100;
    let hx = map(user.x, cx - canvasWidth, cx + canvasWidth, -hoff, hoff);
    let hy = map(user.y, cy - canvasHeight, cy + canvasHeight, -hoff, hoff);
    let shadow = 100;
    let sx = hx * -shadow;
    let sy = hy * -shadow;
    stroke(0, 0, 255);
    line(cx, cy, cx + sx, cy + sy);
    noStroke();
    return {
        x: cx + sx,
        y: cy + sy,
    }
}
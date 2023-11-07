/**
 * Sound activity
 * Ryan Bujold
 * 
 * Using a new library to oscillate sound.
 */

"use strict";

let balls = [];

function preload() {

}

function setup() {
    createCanvas(600,600);
}

function draw() {
    background(0);

    for(let i = 0; i < balls.length; i ++){
        balls[i].move();
        balls[i].bounce();
        balls[i].draw();
    }

}

function createBall(x, y){
    let ball = new Ball(x, y);
    balls.push(ball);
}

function mousePressed(){
    createBall(mouseX, mouseY);
}
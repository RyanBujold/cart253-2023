/**
 * Sound activity
 * Ryan Bujold
 * 
 * Using a new library to oscillate sound.
 */

"use strict";

let balls = [];
let notes = ['F3', 'G3', 'Ab4', 'Bb4', 'C4', 'Db4', 'Eb4', 'F4'];

function preload() {

}

function setup() {
    userStartAudio();

    createCanvas(600, 600);
}

function draw() {
    background(0);

    for (let i = 0; i < balls.length; i++) {
        balls[i].move();
        balls[i].bounce();
        balls[i].display();
    }

}

function createBall(x, y) {
    let synth = new p5.PolySynth;
    let index = new random(0, notes.length-1);
    let note = notes[index];
    let ball = new Ball(x, y, note, synth);
    balls.push(ball);
}

function mousePressed() {
    createBall(mouseX, mouseY);
}
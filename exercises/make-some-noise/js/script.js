/**
 * Make some noise
 * Ryan Bujold
 * 
 * Using the p5 sound library to experiment with 
 * sound for the final project.
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
    let synth = new p5.PolySynth();
    let index = new random(0, notes.length-1);
    let panner = new p5.Panner3D();
    let note = notes[index];
    let ball = new Ball(x, y, note, synth, panner);
    balls.push(ball);
}

function mousePressed() {
    createBall(mouseX, mouseY);
}
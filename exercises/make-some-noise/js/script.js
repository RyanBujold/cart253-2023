/**
 * Make some noise
 * Ryan Bujold
 * 
 * Using the p5 sound library to experiment with 
 * sound for the final project. This simulation 
 * emulates footsteps in a 3d sound space.
 */

"use strict";

let footsteps = [];
let footstepSFX;

function preload() {
    footstepSFX = loadSound(`assets/sounds/footsteps.wav`);
}

function setup() {
    userStartAudio();

    getAudioContext().listener.setPosition(width/2,height/2,0);
    console.log(getAudioContext());

    createCanvas(600, 600);
}

function draw() {
    background(0);

    for (let i = 0; i < footsteps.length; i++) {
        footsteps[i].move();
        footsteps[i].bounce();
        footsteps[i].display();
    }
}

function createFootstep(x, y) {
    let panner = new p5.Panner3D();
    let ball = new Footstep(x, y, panner, footstepSFX);
    footsteps.push(ball);
}

function mousePressed() {
    createFootstep(mouseX, mouseY);
}
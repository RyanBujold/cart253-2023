/**
 * Final Project - Dark House
 * Ryan Bujold
 * 
 * A top down survival shooter using a flashlight to light your way and survive enemies.
 * 
 * Credits: 
 * Help with shadows programming from this video: https://www.youtube.com/watch?v=HizBndP0YEE
 * HVD_Bodedo font licence in files
 * darkness music: https://opengameart.org/content/in-darkness
 * gun shot sound: https://freesound.org/people/Bird_man/sounds/275151/
 * organ music: https://opengameart.org/content/second-organ-song
 * thunder sound: https://freesound.org/people/straget/sounds/527664/
 */

"use strict";

let canvasWidth = 1600
let canvasHeight = 800;

let user;
let walls = [
    // Border walls
    new Wall(0, 0, 50, canvasHeight),
    new Wall(0, 0, canvasWidth, 50),
    new Wall(canvasWidth - 50, 0, 50, canvasHeight),
    new Wall(0, canvasHeight - 50, canvasWidth, 50),
    // Top left room
    new Wall(300, 50, 250, 100),
    new Wall(300, 250, 50, 100),
    // Left middle hallway intersection
    new Wall(50, 350, 50, 200),
    new Wall(200, 350, 150, 50),
    new Wall(200, 500, 150, 50),
    // Bottom left room
    new Wall(350, 700, 200, 50),
    new Wall(350, 500, 200, 100),
    // Bottom hallway
    new Wall(650, 500, 500, 100),
    new Wall(650, 700, 500, 50),
    // Middle Room
    new Wall(350, 250, 300, 50),
    new Wall(750, 250, 300, 50),
    new Wall(900, 300, 250, 200),
    // Bottom Right room
    new Wall(1150, 500, 300, 50),
    // Right top and middle room
    new Wall(1150, 200, 150, 300),
    new Wall(1150, 50, 150, 50),
    // Top room
    new Wall(800, 50, 100, 100),
    new Wall(1000, 150, 50, 100),
];
let enemies = [
    new Enemy(100, 700, walls, true),
];
let spawnTimer = {
    limit: 300,
    count: 0,
};
let lightningTimer = {
    limit: 900,
    count: 0,
}
let fadeTimer = {
    limit: 120,
    count: 0,
}
let points = 0;
let state = "title";

let titleFont;
let gunShotSFX;
let lightningSFX;
let footstepSFX;
let mainMusic;
let loseMusic;

function preload() {
    // Load fonts
    titleFont = loadFont("assets/HVD_Bodedo.otf");
    // Load music and sound effects
    gunShotSFX = loadSound("assets/sounds/gunShot.wav");
    gunShotSFX.setVolume(0.2);
    lightningSFX = loadSound("assets/sounds/thunder.wav");
    lightningSFX.setVolume(1.7);
    footstepSFX = loadSound("assets/sounds/footsteps.wav");
    footstepSFX.setVolume(2.0);
    loseMusic = loadSound("assets/sounds/organMusic.mp3");
    loseMusic.setVolume(0.5);
    mainMusic = loadSound("assets/sounds/darknessMusic.mp3");
    mainMusic.setVolume(0.1);
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    angleMode(DEGREES);
    noStroke();

    // Initialize objects
    user = new User(650, 100, walls, gunShotSFX, footstepSFX);
}

function draw() {
    switch (state) {
        case "title":
            titleState();
            break;
        case "main":
            mainState();
            break;
        case "lose":
            loseState();
            break;
    }
}

function mainState() {
    // Play the main state music
    if(!mainMusic.isPlaying()){
        mainMusic.play();
        mainMusic.loop();
    }

    // Lightning
    lightningTimer.count ++;
    if(lightningTimer.count >= lightningTimer.limit){
        lightningTimer.count = 0;
        lightningSFX.play();
    }
    let bg = map(lightningTimer.count, 0, 100, 255, 0);
    background(bg);

    // Move the user
    user.move();
    user.display();
    user.updateBullets(enemies);
    if (user.checkDefeat()) {
        mainMusic.stop();
        user.footstepSFX.stop();
        state = "lose";
        return;
    }

    // Draw the user's flashlight
    user.displayFlashlight();

    // Move the enemies
    for (let i = 0; i < enemies.length; i++) {
        if (!enemies[i].isAlive) {
            // Remove the element from the array
            enemies.splice(i, 1);
            points += 10;
            continue;
        }
        enemies[i].move(user);
        enemies[i].display(user);
    }

    // Update and draw the walls
    for (let i = 0; i < walls.length; i++) {
        // Make sure the shadow transparency is consistent with the lighting effect
        walls[i].shadowAlpha = map(lightningTimer.count, 0, 100, 0, 255);
        walls[i].update(user);
        walls[i].display();
    }

    // Update our spawner
    spawnTimer.count++;
    if (spawnTimer.count >= spawnTimer.limit) {
        spawnEnemmy();
        spawnTimer.count = 0;
    }

    // Show the number of enemies
    fill(200);
    text("Hazard Level: " + enemies.length, 50, 50);
    text("Score: " + points, 50, 70);
}

function loseState() {
    // Play the lose state music
    if(!loseMusic.isPlaying()){
        loseMusic.play();
        loseMusic.loop();
    }

    // Fading transition
    if(fadeTimer.count <= fadeTimer.limit){
        let alpha = map(fadeTimer.count, 0, fadeTimer.limit, 0, 255);
        background(0,0,0,alpha);
    }
    else {
        push();
        background(0);
        textFont(titleFont);
        fill(150,0,0);
        textSize(70);
        text("Game Over", 100, 100);
        fill(255);
        textSize(40);
        text("Final Score: " + points, 100, 250);
        text("Final Hazard Level: " + enemies.length, 100, 350);
        fill(200);
        textSize(20);
        text("Press Enter To Restart", 1100, 700);
        pop();
    
        if (keyIsDown(ENTER)) {
            reset();
            loseMusic.stop();
            state = "main";
        }
    }
    fadeTimer.count ++;

}

function titleState() {
    background(0);

    push();
    fill(255);
    triangle(490, 280, 1090, 280, 760, 160);
    textFont(titleFont);
    textSize(70);
    text("DARK HOUSE", 490, 360);
    fill(200);
    textSize(40);
    text("PRESS ENTER", 590, 430);
    pop();

    if (keyIsDown(ENTER)) {
        state = "main";
    }
}

function reset() {
    user = new User(650, 100, walls, gunShotSFX, footstepSFX);
    enemies = [
        new Enemy(100, 700, walls, true),
    ];
    spawnTimer.count = 0;
    lightningTimer.count = 0;
    fadeTimer.count = 0;
    points = 0;
}

function spawnEnemmy() {
    let num = round(random(0, 3));
    switch (num) {
        case 0:
            enemies.push(new Enemy(100, 700, walls));
            break;
        case 1:
            enemies.push(new Enemy(100, 100, walls));
            break;
        case 2:
            enemies.push(new Enemy(1500, 100, walls));
            break;
        case 3:
            enemies.push(new Enemy(1500, 700, walls));
            break;
    }
}
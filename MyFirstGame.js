"use strict";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 825;
canvas.hegiht = 510;

//Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background3.3.png";

//Chipmunk image    
var chipmunkReady = false;
var chipmunkImage = new Image();
var chipmunk = {};
var score = 0;

chipmunkImage.onload = function () {
    chipmunkReady = true;
};
chipmunkImage.src = "images/chipmunk1.2.png";

// Chipmunk moving speed and interval 
var speed = 3000;
var newSpeed = speed;
var speedFactor = 1.1;

// Reset 
var reset = function () {
    // Places the chipmunk randomly on the canvas
    chipmunk.x = 60 + (Math.random() * (canvas.width - 150));
    chipmunk.y = 60 + (Math.random() * (canvas.height -150));
};    

// Reset the game score when the user clicks reset score button
function resetScore() {
    newSpeed = speed;
    score = 0;
    reset();
    then = Date.now();
}

// Reset speed of the object 
function resetSpeed() {
   newSpeed = speed;
   then = Date.now();
}

// Get the Chipmunk
function getChipmunk(e) {
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;

    if (y > chipmunk.y && y < chipmunk.y + 510 && x > chipmunk.x && x < 825) 
    {
        score++;
        reset();
        newSpeed = newSpeed / speedFactor;
        then = Date.now();
    }
}

// Draw everything
var render = function () {
    if (bgReady) 
    {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (chipmunkReady) 
    {
        ctx.drawImage(chipmunkImage, chipmunk.x, chipmunk.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, 32, 32);
    };

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    if (delta > newSpeed) 
    {
        reset();
    }
    render();

    if (delta > newSpeed)
    {
        then = Date.now();
    }

    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

function createEventListeners() {
    addEventListener("mousedown", getChipmunk, false);
    document.getElementById("resetSc").addEventListener("click", resetScore, false);
    document.getElementById("resetSp").addEventListener("click", resetSpeed, false);
}

// Play the game
var then = Date.now();
reset();
main();

window.addEventListener("load", createEventListeners, false);



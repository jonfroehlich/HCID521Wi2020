// Bounces a ball around the screen
// Based on: https://editor.p5js.org/p5/sketches/Motion:_Bounce
//
// By Jon Froehlich
// http://makeabilitylab.io

let w = 80;
let x = 100, y = 100; // Starting position of shape

let xVel = 2.8; // Speed of the ball
let yVel = 2.2; // Speed of the ball

function setup() {
  createCanvas(720, 400);
  fill(255, 5, 255); // fill color for the ball
}

function draw() {
  background(128);

  // Update the position of the ball
  x += xVel;
  y += yVel;

  // check if ball is off side of screen
  let radius = w /2;
  if (x - radius < 0 || x + radius > width){
    xVel *= -1; // switch x direction
  }
  
  // check if ball is off top or bottom of screen
  if(y - radius < 0 || y + radius > height){
    yVel *= -1; // switch y direction
  }
  
  ellipse(x, y, w);
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide(); // hide the raw video stream
  noStroke();
}

function draw() {
  background(220);
  
  image(video, 0, 0);
  
  let gridCellSize = 10;
  
  // this loop iterates over pixels in the video, grabs the color,
  // and draws a circle of that color on top!
  for(let col = 0; col < width; col += gridCellSize){
    for(let row = 0; row < height; row += gridCellSize){
      let colorAtPixel = get(col, row);
      colorAtPixel[3] = random(100, 255); // add in some opacity
      fill(colorAtPixel); // set the color
      
      // draw the ellipse at a constrained random size
      let ellipseWidth = random(1, gridCellSize * 2);
      let ellipseHeight = random(1, gridCellSize * 2);
      ellipse(col, row, ellipseWidth, ellipseHeight);
    }
  }
  
}
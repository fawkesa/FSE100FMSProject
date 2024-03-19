// Create an array to store square objects
let squares = [];

// Number of squares
const numSquares = 6;

// Setup function
function setup() {
  // Create a canvas
  createCanvas(600, 400);

  // Initialize squares on the left side
  for (let i = 0; i < numSquares / 2; i++) {
    squares.push({
      x: 13, // X-coordinate for left side
      y: 60 + i * 100, // Y-coordinate changes for each square
      size: 50, // Size of the square
      colorShape: "red", // Assigning red color
      isDragging: false, // Dragging state
      offsetX: 0, // Offset between mouse position and square position
      offsetY: 0
    });
  }
  
  // Initialize squares on the right side
  for (let i = 0; i < numSquares / 2; i++) {
    squares.push({
      x: width - 63, // X-coordinate for right side
      y: 60 + i * 100, // Y-coordinate changes for each square
      size: 50, // Size of the square
      colorShape: "red", // Assigning red color
      isDragging: false, // Dragging state
      offsetX: 0, // Offset between mouse position and square position
      offsetY: 0
    });
  }
}

// Draw function
function draw() {
  // Set background color
  background(220);
  // left side lines drawn
  line(75, 0, 75, 400);
  line(75, 035, 0, 035);
  line(75, 135, 0, 135);
  line(75, 235, 0, 235);
  line(75, 335, 0, 335);
  //right side lines 575
  line(525, 0, 525, 400);
  line(525, 035, 600, 035);
  line(525, 135, 600, 135);
  line(525, 235, 600, 235);
  line(525, 335, 600, 335);
  

  // Draw squares
  for (let i = 0; i < squares.length; i++) {
    let square = squares[i];
    fill(""+square.colorShape+"");
    rect(square.x, square.y, square.size, square.size);
  }
}

// Mouse pressed function
function mousePressed() {
  // Check if mouse is pressed over any square
  for (let i = 0; i < squares.length; i++) {
    let square = squares[i];
    if (mouseX >= square.x && mouseX <= square.x + square.size &&
        mouseY >= square.y && mouseY <= square.y + square.size) {
      square.isDragging = true;
      square.offsetX = mouseX - square.x;
      square.offsetY = mouseY - square.y;
      square.colorShape = "yellow";
    }
  }
}

// Mouse released function
function mouseReleased() {
  // Stop dragging when mouse button is released
  for (let i = 0; i < squares.length; i++) {
    squares[i].isDragging = false;
    squares[i].colorShape = "red";
  }
}

// Mouse dragged function
function mouseDragged() {
  // Update square positions while dragging
  for (let i = 0; i < squares.length; i++) {
    let square = squares[i];
    if (square.isDragging) {
      square.x = mouseX - square.offsetX;
      square.y = mouseY - square.offsetY;
    }
  }
}

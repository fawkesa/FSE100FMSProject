// Create an array to store square objects
let shapes = [];
// Number of shapes
const numShapes = 6;

// Setup function
function setup() {
  // Create a canvas
  createCanvas(1000, 600);
  // Initialize shapes
  // for (let i = 0; i < numShapes; i++) {
  //   shapes.push({
  //     x: random(width - 50), // Random x-coordinate
  //     y: random(height - 50), // Random y-coordinate
  //     size: 50, // Size of the square
  //     isDragging: false, // Dragging state
  //     offsetX: 0, // Offset between mouse position and square position
  //     offsetY: 0
  //   });
  // }
  genShapes();
}

// Draw function
function draw() {
  // Set background color
  background(220);
  // Draw shapes
  for (let i = 0; i < shapes.length; i++) {
    var x = shapes[i];
    fill(255,0,0);
    x["function"](...x["args"]);
  }
}

// Mouse pressed function
function mousePressed() {
  // Check if mouse is pressed over any square
  for (let i = 0; i < shapes.length; i++) {
    let square = shapes[i];
    if (mouseX >= square.x && mouseX <= square.x + square.size &&
      mouseY >= square.y && mouseY <= square.y + square.size) {
      square.isDragging = true;
      square.offsetX = mouseX - square.x;
      square.offsetY = mouseY - square.y;
    }
  }
}

// Mouse released function
function mouseReleased() {
  // Stop dragging when mouse button is released
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].isDragging = false;
  }
}

// Mouse dragged function
function mouseDragged() {
  // Update square positions while dragging
  for (let i = 0; i < shapes.length; i++) {
    let square = shapes[i];
    if (square.isDragging) {
      square.x = mouseX - square.offsetX;
      square.y = mouseY - square.offsetY;
    }
  }
}

// dont read this please
function genShapes() {
  const x = floor(random(numShapes));
  switch (x) {
    case 0:
    case 1:
      shapes.push({
        "function": function(a,b,c) {return square(a,b,c)},
        "args": [50,50,100]
      });
      break;
    case 2:
    case 3:
    case 4:
    case 5:
    default:
      shapes.push({
        "function": function(a,b,c,d) {return ellipse(a,b,c,d)},
        "args": [50, 50, random(50, 100), random(50, 100)]
      });
  }
}

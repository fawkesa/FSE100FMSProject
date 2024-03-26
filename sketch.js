// Create an array to store shape objects
let shapes = [];
let grayShapesTop = [];
let grayShapesBottom = [];

// List of shapes
const shapeTypes = ["square", "triangle", "semi-circle", "rectangle", "rhombus", "trapezoid"];

// Shuffle the order of shapes using Fisher-Yates algorithm
for (let i = shapeTypes.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shapeTypes[i], shapeTypes[j]] = [shapeTypes[j], shapeTypes[i]];
}

// Setup function
function setup() {
  // Create a canvas
  createCanvas(600, 400);

  // Initialize shapes
  for (let i = 0; i < shapeTypes.length; i++) {
    // Define initial coordinates for red shapes
    let x, y;
    if (i < shapeTypes.length / 2) {
      // Left side coordinates
      x = 13;
      y = 60 + (i % (shapeTypes.length / 2)) * 100;
    } else {
      // Right side coordinates
      x = width - 63;
      y = 60 + (i % (shapeTypes.length / 2)) * 100;
    }

    // Generate unique identifier for each shape pair
    let shapeID = i;

    // Push red shape object
    shapes.push({
      shapeID: shapeID,
      x: x,
      y: y,
      size: 50,
      colorShape: "red",
      isDragging: false,
      offsetX: 0,
      offsetY: 0,
      shapeType: shapeTypes[i]
    });
  }

  // Initialize gray shapes in the top half
  for (let i = 0; i < 3; i++) {
    // Center X-coordinate
    const xTop = (width / 4) * (i + 1) - 25;
    const yTop = height / 4 - 25;
    
    // Generate unique identifier for each shape pair
    let shapeID = i;

    // Push gray shape object
    grayShapesTop.push({
      shapeID: shapeID,
      x: xTop,
      y: yTop,
      size: 50,
      colorShape: 200, // Gray color
      isDragging: false,
      isFrozen: false, // New property to track if gray shape is frozen
      shapeType: shapeTypes[i]
    });
  }

  // Initialize gray shapes in the bottom half
  for (let i = 3; i < 6; i++) {
    // Center X-coordinate
    const xBottom = (width / 4) * (i - 2) - 25;
    const yBottom = (height / 4) * 3 - 25;

    // Generate unique identifier for each shape pair
    let shapeID = i;

    // Push gray shape object
    grayShapesBottom.push({
      shapeID: shapeID,
      x: xBottom,
      y: yBottom,
      size: 50,
      colorShape: 200, // Gray color
      isDragging: false,
      isFrozen: false, // New property to track if gray shape is frozen
      shapeType: shapeTypes[i]
    });
  }
}

// Draw function
function draw() {
  // Set background color
  background(220);
  line(75, 0, 75, 400);
  line(75, 35, 0, 35);
  line(75, 135, 0, 135);
  line(75, 235, 0, 235);
  line(75, 335, 0, 335);
  //right side lines 525
  line(525, 0, 525, 400);
  line(525, 35, 600, 35);
  line(525, 135, 600, 135);
  line(525, 235, 600, 235);
  line(525, 335, 600, 335);

  // Draw gray shapes in the top half
  for (let i = 0; i < grayShapesTop.length; i++) {
    let grayShape = grayShapesTop[i];
    fill(grayShape.colorShape);
    drawShape(grayShape);
  }

  // Draw gray shapes in the bottom half
  for (let i = 0; i < grayShapesBottom.length; i++) {
    let grayShape = grayShapesBottom[i];
    fill(grayShape.colorShape);
    drawShape(grayShape);
  }

  // Draw red shapes
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    fill(shape.colorShape);
    drawShape(shape);
  }
}

// Function to draw shapes based on type
function drawShape(shape) {
  if (shape.shapeType === "square") {
    rect(shape.x, shape.y, shape.size, shape.size);
  } else if (shape.shapeType === "triangle") {
    triangle(shape.x + shape.size / 2, shape.y, shape.x + shape.size, shape.y + shape.size, shape.x, shape.y + shape.size);
  } else if (shape.shapeType === "semi-circle") {
    arc(shape.x + shape.size / 2, shape.y + shape.size / 2, shape.size, shape.size, PI, 0);
  } else if (shape.shapeType === "rectangle") {
    rect(shape.x, shape.y, shape.size * 2, shape.size);
  } else if (shape.shapeType === "rhombus") {
    beginShape();
    vertex(shape.x + shape.size / 2, shape.y);
    vertex(shape.x + shape.size, shape.y + shape.size / 2);
    vertex(shape.x + shape.size / 2, shape.y + shape.size);
    vertex(shape.x, shape.y + shape.size / 2);
    endShape(CLOSE);
  } else if (shape.shapeType === "trapezoid") {
    beginShape();
    vertex(shape.x + shape.size / 4, shape.y);
    vertex(shape.x + (shape.size * 3) / 4, shape.y);
    vertex(shape.x + shape.size, shape.y + shape.size);
    vertex(shape.x, shape.y + shape.size);
    endShape(CLOSE);
  }
}

// Mouse pressed function
function mousePressed() {
  // Check if mouse is pressed over any red shape
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    if (!shape.isFrozen && mouseX >= shape.x && mouseX <= shape.x + shape.size &&
        mouseY >= shape.y && mouseY <= shape.y + shape.size) {
      shape.isDragging = true;
      shape.offsetX = mouseX - shape.x;
      shape.offsetY = mouseY - shape.y;
      shape.colorShape = "yellow";
    }
  }
}

// Mouse dragged function
function mouseDragged() {
  // Update shape positions while dragging
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    if (shape.isDragging) {
      shape.x = mouseX - shape.offsetX;
      shape.y = mouseY - shape.offsetY;
    }
  }
}

// Mouse released function
function mouseReleased() {
  // Stop dragging when mouse button is released
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    if (shape.isDragging) {
      // Find the corresponding gray shape with the same shapeID
      let correspondingGrayShape;
      if (shape.y < height / 2) {
        correspondingGrayShape = grayShapesTop.find(grayShape => grayShape.shapeID === shape.shapeID);
      } else {
        correspondingGrayShape = grayShapesBottom.find(grayShape => grayShape.shapeID === shape.shapeID);
      }
      if (correspondingGrayShape) {
        // If the red shape fits into the corresponding gray shape
        if (abs(shape.x - correspondingGrayShape.x) < 5 && abs(shape.y - correspondingGrayShape.y) < 5) {
          // Snap the red shape to the gray shape
          shape.x = correspondingGrayShape.x;
          shape.y = correspondingGrayShape.y;
          shape.isFrozen = true;
          shape.colorShape = "green";
        }
      }
      shape.isDragging = false;
    }
  }
}


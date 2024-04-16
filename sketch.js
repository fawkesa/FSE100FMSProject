let shapes = [];
let grayShapesTop = [];
let grayShapesBottom = [];
let gameStarted = false; // Variable to check if game has started
let startTime; // Variable for timer start
let allGreen = false; 
let finalTime;
let grade;


// List of shapes
const shapeTypes = ["square", "triangle", "semi-circle", "rectangle", "rhombus", "trapezoid"];

// Shuffle the order of shapes using Fisher-Yates algorithm
for (let i = shapeTypes.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shapeTypes[i], shapeTypes[j]] = [shapeTypes[j], shapeTypes[i]];
}

function setup() {
  createCanvas(800, 500);

  // Initial vertical starting point and vertical gap for the red shapes
  const startY = 100; // Starting y position for the red shapes
  const redGap = 100; // Vertical gap between the red shapes

  // Shuffle and assign shape types to red shapes
  shuffle(shapeTypes, true);
  for (let i = 0; i < shapeTypes.length; i++) {
    let x, y;
    if (i < shapeTypes.length / 2) {
      x = 13; // Left side shapes
      y = startY + (i % (shapeTypes.length / 2)) * redGap;
    } else {
      x = width - 88; // Adjusted position for right side shapes
      y = startY + (i % (shapeTypes.length / 2)) * redGap;
    }
    let shapeID = i;
    shapes.push({shapeID, x, y, size: 50, colorShape: "red", isDragging: false, offsetX: 0, offsetY: 0, shapeType: shapeTypes[i]});
  }

  const graySize = 50; // Size of each gray shape
  const grayGap = 100; // Desired horizontal gap between gray shapes
  const totalGrayWidth = 3 * graySize + 2 * grayGap;
  const startX = (width - totalGrayWidth) / 2; // Centering gray shapes

  // Assign shapes to gray shapes top and bottom rows
  // First, split the shapeTypes into two groups for top and bottom rows
  let topShapes = shapeTypes.slice(0, 3);
  let bottomShapes = shapeTypes.slice(3, 6);

  // Place top row shapes
  for (let i = 0; i < topShapes.length; i++) {
    const xTop = startX + i * (graySize + grayGap);
    const yTop = height / 4 - 25; // Position on the top third of the screen
    let shapeID = i;
    grayShapesTop.push({shapeID, x: xTop, y: yTop, size: 50, colorShape: 200, isDragging: false, isFrozen: false, shapeType: topShapes[i]});
  }

  // Place bottom row shapes
  for (let i = 0; i < bottomShapes.length; i++) {
    const xBottom = startX + i * (graySize + grayGap);
    const yBottom = 2 * height / 3 - 25; // Position on the bottom third of the screen
    let shapeID = i;
    grayShapesBottom.push({shapeID, x: xBottom, y: yBottom, size: 50, colorShape: 200, isDragging: false, isFrozen: false, shapeType: bottomShapes[i]});
  }
}



function draw() {
  if (!gameStarted) {
    background(220);
    fill('rgba(0,0,0,0.5)');
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Start', width / 2, height / 2);
  } else {
    background(220);
    line(125, 0, 125, 500);
    line(125, 75, 0, 75);
    line(125, 175, 0, 175);
    line(125, 275, 0, 275);
    line(125, 375, 0, 375);
    line(675, 0, 675, 500);
    line(675, 75, 800, 75);
    line(675, 175, 800, 175);
    line(675, 275, 800, 275);
    line(675, 375, 800, 375);

    for (let i = 0; i < grayShapesTop.length; i++) {
      let grayShape = grayShapesTop[i];
      fill(grayShape.colorShape);
      drawShape(grayShape);
    }

    for (let i = 0; i < grayShapesBottom.length; i++) {
      let grayShape = grayShapesBottom[i];
      fill(grayShape.colorShape);
      drawShape(grayShape);
    }

    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      fill(shape.colorShape);
      drawShape(shape);
    }

    // Check if all shapes are green, but only once
    if (!allGreen) {
      allGreen = shapes.every(shape => shape.colorShape === "green");
      if (allGreen) {
        finalTime = (millis() - startTime) / 1000;
        grade = calculateGrade(finalTime); // Calculate the grade once all shapes are green
      }
    }
    if (!allGreen) {
      let elapsedTime = (millis() - startTime) / 1000;
      fill(0);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(elapsedTime.toFixed(2) + "s", width / 2, 50);
    } else {
      // Once all shapes are green, display the game ended screen with the grade
      background('rgba(0, 0, 0, 0.5)');
      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      text(`Game Over! Your grade: ${grade}`, width / 2, height / 2);
    }
    
    // Display the timer continuously, stop updating if all shapes are green
    let elapsedTime = allGreen ? finalTime : (millis() - startTime) / 1000; // Use finalTime if allGreen, else calculate elapsed time
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(elapsedTime.toFixed(2) + "s", width / 2, 50);
  }
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    startTime = millis();
    allGreen = false; // Ensure this is reset in case the game restarts without reloading the page
    finalTime = undefined; // Reset finalTime for a new game session
  } else {
    // Shape dragging logic
    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      if (mouseX >= shape.x && mouseX <= shape.x + shape.size &&
          mouseY >= shape.y && mouseY <= shape.y + shape.size && !shape.isFrozen) {
        shape.isDragging = true;
        shape.offsetX = mouseX - shape.x;
        shape.offsetY = mouseY - shape.y;
        shape.colorShape = "yellow";
      }
    }
  }
}


// Mouse dragged function
function mouseDragged() {
  // Your original mouseDragged code
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
  // Your original mouseReleased code
  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    if (shape.isDragging) {
      let correspondingGrayShape;
      
      // Check if the shape is in the top or bottom third of the canvas
      if (shape.y < height / 2) {
        correspondingGrayShape = grayShapesTop.find(grayShape => grayShape.shapeType === shape.shapeType);
      } else {
        correspondingGrayShape = grayShapesBottom.find(grayShape => grayShape.shapeType === shape.shapeType);
      }
      
      // Check for proximity and if matched, freeze and change color
      if (correspondingGrayShape && Math.abs(shape.x - correspondingGrayShape.x) < 5 && Math.abs(shape.y - correspondingGrayShape.y) < 5) {
        shape.x = correspondingGrayShape.x;
        shape.y = correspondingGrayShape.y;
        shape.isFrozen = true;
        shape.colorShape = "green";
      }

      shape.isDragging = false;
    }
  }
}


// Function to draw shapes based on type
function drawShape(shape) {
  push(); // Start a new drawing state
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
  pop(); // Restores the previous drawing state
}
function calculateGrade(time) {
  if (time <= 10) return "A+";
  if (time <= 15) return "A";
  if (time <= 20) return "B";
  if (time <= 30) return "C";
  if (time <= 40) return "D";
  if (time >  40) return "E";
  return "F"; // For times over 50 seconds
}

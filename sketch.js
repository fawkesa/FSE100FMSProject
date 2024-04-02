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

// Setup function
function setup() {
  createCanvas(600, 400);

  for (let i = 0; i < shapeTypes.length; i++) {
    let x, y;
    if (i < shapeTypes.length / 2) {
      x = 13;
      y = 60 + (i % (shapeTypes.length / 2)) * 100;
    } else {
      x = width - 63;
      y = 60 + (i % (shapeTypes.length / 2)) * 100;
    }
    let shapeID = i;
    shapes.push({shapeID, x, y, size: 50, colorShape: "red", isDragging: false, offsetX: 0, offsetY: 0, shapeType: shapeTypes[i]});
  }

  for (let i = 0; i < 3; i++) {
    const xTop = (width / 4) * (i + 1) - 25;
    const yTop = height / 4 - 25;
    let shapeID = i;
    grayShapesTop.push({shapeID, x: xTop, y: yTop, size: 50, colorShape: 200, isDragging: false, isFrozen: false, shapeType: shapeTypes[i]});
  }

  for (let i = 3; i < 6; i++) {
    const xBottom = (width / 4) * (i - 2) - 25;
    const yBottom = (height / 4) * 3 - 25;
    let shapeID = i;
    grayShapesBottom.push({shapeID, x: xBottom, y: yBottom, size: 50, colorShape: 200, isDragging: false, isFrozen: false, shapeType: shapeTypes[i]});
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
    line(75, 0, 75, 400);
    line(75, 35, 0, 35);
    line(75, 135, 0, 135);
    line(75, 235, 0, 235);
    line(75, 335, 0, 335);
    line(525, 0, 525, 400);
    line(525, 35, 600, 35);
    line(525, 135, 600, 135);
    line(525, 235, 600, 235);
    line(525, 335, 600, 335);

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
      if (shape.y < height / 2) {
        correspondingGrayShape = grayShapesTop.find(grayShape => grayShape.shapeID === shape.shapeID);
      } else {
        correspondingGrayShape = grayShapesBottom.find(grayShape=> grayShape.shapeID === shape.shapeID);
      }
      if (correspondingGrayShape) {
        if (abs(shape.x - correspondingGrayShape.x) < 5 && abs(shape.y - correspondingGrayShape.y) < 5) {
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

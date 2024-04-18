const shapeTypes = ["square", "triangle", "semi-circle", "rectangle", "rhombus", "trapezoid"];
let grade;  // Declare grade variable at the top of your script\
let gameEnded = false;  // Flag to check if the game has ended

function game4Preload(){
  
}

function game4Setup(){
  background("white");
  currentActivity = 4;
  gameStarted = false;
  allGreen = false;
  shapes = [];
  grayShapesTop = [];
  grayShapesBottom = [];
  setupGame4Shapes();  
  // Hide the Activity 4 button, show all the other buttons
  menuButton.show();
  game1Button.hide();
  game2Button.hide();
  game3Button.hide();
  game4Button.hide();
  game5Button.hide();
  settingsButton.hide();
  profileButton.hide();
}

function game4Draw() {
  if (!gameStarted) {
    background(220);
    fill('rgba(0,0,0,0.5)');
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Click to start', width / 2, height / 2);
  } else {
    background(220);
    for (let shape of grayShapesTop) {
      fill(shape.colorShape);
      drawShape(shape);
    }
    for (let shape of grayShapesBottom) {
      fill(shape.colorShape);
      drawShape(shape);
    }
    for (let shape of shapes) {
      fill(shape.colorShape);
      drawShape(shape);
    }
    displayTimer();
  }
}

function game4MousePressed() {
    if (!gameStarted) {
        if (gameEnded) {
            // Optionally reset game here or do nothing
            console.log("Game already ended. Click to restart or return to main menu.");
            // resetGame();  // If you have a function to reset the game
        } else {
            gameStarted = true;
            startTime = millis();
        }
    } else if (!gameEnded) {  // Only allow interaction if the game hasn't ended
        for (let shape of shapes) {
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


function game4MouseDragged() {
  for (let shape of shapes) {
    if (shape.isDragging) {
      shape.x = mouseX - shape.offsetX;
      shape.y = mouseY - shape.offsetY;
    }
  }
}

function game4MouseReleased() {
  for (let shape of shapes) {
    if (shape.isDragging) {
      let correspondingGrayShape;
      if (shape.y < height / 2) {
        correspondingGrayShape = grayShapesTop.find(g => g.shapeType === shape.shapeType);
      } else {
        correspondingGrayShape = grayShapesBottom.find(g => g.shapeType === shape.shapeType);
      }
      if (correspondingGrayShape && Math.abs(shape.x - correspondingGrayShape.x) < 5 && Math.abs(shape.y - correspondingGrayShape.y) < 5) {
        shape.x = correspondingGrayShape.x;
        shape.y = correspondingGrayShape.y;
        shape.isFrozen = true;
        shape.colorShape = "green";
      }
      shape.isDragging = false;
    }
  }
  checkCompletion();
}


function checkCompletion() {
    allGreen = shapes.every(shape => shape.colorShape === "green");
    if (allGreen && !gameEnded) {  // Check if all shapes are green and the game hasn't ended yet
        finalTime = (millis() - startTime) / 1000;
        grade = calculateGrade(finalTime);
        gameEnded = true;  // Set the game ended flag to true
        console.log("Game ended. Final time:", finalTime, "Grade:", grade);
    }
}


function displayTimer() {
    if (!allGreen) {
        let elapsedTime = (millis() - startTime) / 1000;
        fill(0);
        textSize(16);
        textAlign(CENTER, CENTER);
        text(elapsedTime.toFixed(2) + "s", width / 2, 50);
    } else {
        if (!gameEnded) {
            gameEnded = true; // Ensure this only happens once
            finalTime = (millis() - startTime) / 1000;
            grade = calculateGrade(finalTime);
            console.log("Game ended. Final time:", finalTime, "Grade:", grade);
        }
        // Draw the game over screen only after the game has ended
        background('rgba(0, 0, 0, 0.5)');
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(`Game Over! Your grade is: ${grade}`, width / 2, height / 2);
    }
}


function drawShape(shape) {
  push();
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
  pop();
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

function setupGame4Shapes() {
  const startY = 100;
  const redGap = 100;
  const graySize = 50;
  const grayGap = 100;
  const totalGrayWidth = 3 * graySize + 2 * grayGap;
  const startX = (width - totalGrayWidth) / 2;

  // Shuffle shape types
  shuffle(shapeTypes, true);

  for (let i = 0; i < shapeTypes.length; i++) {
    let x, y;
    if (i < shapeTypes.length / 2) {
      x = 13;
      y = startY + (i % (shapeTypes.length / 2)) * redGap;
    } else {
      x = width - 88;
      y = startY + (i % (shapeTypes.length / 2)) * redGap;
    }
    shapes.push({
      shapeID: i,
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

  // Split shapes for top and bottom gray shapes
  let topShapes = shapeTypes.slice(0, 3);
  let bottomShapes = shapeTypes.slice(3, 6);

  for (let i = 0; i < topShapes.length; i++) {
    const xTop = startX + i * (graySize + grayGap);
    const yTop = height / 4 - 25;
    grayShapesTop.push({
      shapeID: i,
      x: xTop,
      y: yTop,
      size: 50,
      colorShape: 200,
      isDragging: false,
      isFrozen: false,
      shapeType: topShapes[i]
    });
  }

  for (let i = 0; i < bottomShapes.length; i++) {
    const xBottom = startX + i * (graySize + grayGap);
    const yBottom = 2 * height / 3 - 25;
    grayShapesBottom.push({
      shapeID: i,
      x: xBottom,
      y: yBottom,
      size: 50,
      colorShape: 200,
      isDragging: false,
      isFrozen: false,
      shapeType: bottomShapes[i]
    });
  }
}

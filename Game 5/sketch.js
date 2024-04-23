let shapes = [];
let dropZones = [];
let score = 0;
let draggingShape = null;
let levelCompleted = false;

function setup() {
  createCanvas(750, 500);

  // Creating drop zones
  for (let i = 0; i < 5; i++) { 
    dropZones.push({
      x: 80 + i * 120,
      y: 300,
      shapeType: i % 5
    });
  }

  for (let i = 0; i < 5; i++) { 
    shapes.push(new Shape(random(width), 250, i));
  }
}

function draw() {
  background(173, 216, 230);

  for (let i = 0; i < dropZones.length; i++) {
    drawDropZone(dropZones[i]);
  }

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].display();
  }

  textSize(20);
  textAlign(CENTER);
  text("Score: " + score, width / 2, 30);

  if (levelCompleted) {
    textSize(24);
    text("Congratulations! Click to restart", width / 2, height - 50);
  }
}

function drawDropZone(zone) {
  noFill();
  strokeWeight(2);
  stroke(0);
  rect(zone.x, zone.y, 100, 100);

  textSize(16);
  textAlign(CENTER);
  text(getShapeName(zone.shapeType), zone.x + 50, zone.y + 60);
}

function getShapeName(type) {
  switch (type) {
    case 0:
      return "Circle";
    case 1:
      return "Square";
    case 2:
      return "Triangle";
    case 3:
      return "Star";
    case 4:
      return "Pentagon";
    default:
      return "Unknown";
  }
}

function mousePressed() {
  if (levelCompleted) {
    restartGame();
    levelCompleted = false;
  } else {
    for (let i = shapes.length - 1; i >= 0; i--) {
      if (shapes[i].contains(mouseX, mouseY)) {
        draggingShape = shapes[i];
        draggingShape.dragOffsetX = mouseX - draggingShape.x;
        draggingShape.dragOffsetY = mouseY - draggingShape.y;
        draggingShape.dragging = true;
        break;
      }
    }
  }
}

function mouseDragged() {
  if (draggingShape !== null && draggingShape.dragging) {
    draggingShape.x = mouseX - draggingShape.dragOffsetX;
    draggingShape.y = mouseY - draggingShape.dragOffsetY;
  }
}

function mouseReleased() {
  if (draggingShape !== null && draggingShape.dragging && !levelCompleted) {
    for (let j = 0; j < dropZones.length; j++) {
      if (draggingShape.overlaps(dropZones[j])) {
        if (draggingShape.type === dropZones[j].shapeType) {
          score++;
          shapes.splice(shapes.indexOf(draggingShape), 1);
          if (shapes.length === 0) {
            levelCompleted = true;
          }
        }
        break;
      }
    }
    draggingShape = null;
  }
}

function restartGame() {
  shapes = [];
  score = 0;
  for (let i = 0; i < 5; i++) {
    shapes.push(new Shape(random(width), 250, i));
  }
}

class Shape {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = 50;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.dragging = false;
  }

  display() {
    noStroke();
    fill(255, 0, 0);
    switch (this.type) {
      case 0:
        ellipse(this.x, this.y, this.size);
        break;
      case 1:
        rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        break;
      case 2:
        triangle(this.x - this.size / 2, this.y + this.size / 2,
          this.x, this.y - this.size / 2,
          this.x + this.size / 2, this.y + this.size / 2);
        break;
      case 3:
        star(this.x, this.y, 5, this.size / 2, this.size / 4);
        break;
      case 4:
        pentagon(this.x, this.y, this.size);
        break;
    }
  }

  contains(x, y) {
    switch (this.type) {
      case 0:
        let d = dist(x, y, this.x, this.y);
        return (d < this.size / 2);
      case 1:
        return (x > this.x - this.size / 2 && x < this.x + this.size / 2 &&
          y > this.y - this.size / 2 && y < this.y + this.size / 2);
      case 2:
        return this.pointInTriangle(x, y);
      case 3:
        return this.pointInStar(x, y);
      case 4:
        return this.pointInPentagon(x, y);
    }
  }

  pointInTriangle(x, y) {
    let tx = this.x;
    let ty = this.y - this.size / 2; 
    let bx1 = this.x - this.size / 2;
    let by1 = this.y + this.size / 2;
    let bx2 = this.x + this.size / 2;
    let by2 = this.y + this.size / 2; 
    let alpha = ((by2 - by1)*(x - bx1) + (bx1 - bx2)*(y - by1)) / ((by2 - by1)*(tx - bx1) + (bx1 - bx2)*(ty - by1));
    let beta = ((by1 - ty)*(x - bx1) + (tx - bx1)*(y - by1)) / ((by2 - by1)*(tx - bx1) + (bx1 - bx2)*(ty - by1));
    let gamma = 1 - alpha - beta;

    return alpha > 0 && beta > 0 && gamma > 0;
  }

  pointInStar(x, y) {
    let points = 5;
    let outerRadius = this.size / 2;
    let innerRadius = this.size / 4;

    let angle = TWO_PI / points;
    let halfAngle = angle / 2.0;
    let vertices = [];
    for (let a = -HALF_PI; a < TWO_PI - HALF_PI; a += angle) {
      let sx = this.x + cos(a) * outerRadius;
      let sy = this.y + sin(a) * outerRadius;
      vertices.push(createVector(sx, sy));
      sx = this.x + cos(a + halfAngle) * innerRadius;
      sy = this.y + sin(a + halfAngle) * innerRadius;
      vertices.push(createVector(sx, sy));
    }

    let result = false;
    let j = vertices.length - 1;
    for (let i = 0; i < vertices.length; i++) {
      let xi = vertices[i].x, yi = vertices[i].y;
      let xj = vertices[j].x, yj = vertices[j].y;
      if ((yi > y != yj > y) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        result = !result;
      }
      j = i;
    }
    return result;
  }

  pointInPentagon(x, y) {
    let cx = this.x;
    let cy = this.y;

    let radius = this.size / 2;

    let angle = TWO_PI / 5;
    let angles = [];
    for (let i = 0; i < 5; i++) {
      angles.push(i * angle);
    }

    let inPentagon = false;
    for (let i = 0; i < 5; i++) {
      let x1 = cx + cos(angles[i]) * radius;
      let y1 = cy + sin(angles[i]) * radius;
      let x2 = cx + cos(angles[(i + 1) % 5]) * radius;
      let y2 = cy + sin(angles[(i + 1) % 5]) * radius;
      if (((y1 <= y && y < y2) || (y2 <= y && y < y1)) &&
        (x < (x2 - x1) * (y - y1) / (y2 - y1) + x1)) {
        inPentagon = !inPentagon;
      }
    }
    return inPentagon;
  }

  overlaps(zone) {
    let centerInsideZone = (this.x >= zone.x && this.x <= zone.x + 100 && this.y >= zone.y && this.y <= zone.y + 100);
    switch (this.type) {
      case 0:
        return centerInsideZone;
      case 1:
        return centerInsideZone;
      case 2:
        return centerInsideZone;
      case 3:
        let halfDiagonal = sqrt(pow(100, 2) + pow(100, 2)) / 2;
        let starCenterX = this.x;
        let starCenterY = this.y + this.size / 4;
        return (dist(starCenterX, starCenterY, zone.x + 50, zone.y + 50) < halfDiagonal + this.size / 2);
      case 4:
        return centerInsideZone;
    }
  }
}

function star(x, y, npoints, outerRadius, innerRadius) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * outerRadius;
    let sy = y + sin(a) * outerRadius;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * innerRadius;
    sy = y + sin(a + halfAngle) * innerRadius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function pentagon(x, y, radius) {
  let angle = TWO_PI / 5;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

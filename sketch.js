//The below code is a set up on dragging points that are circles which will be used in our dragging shapes game number 4 :D

//empty array called shapes, holding all the shapes
//drag point to keep track of with point we have clicked and are dragging at any given time
const points = [];
let dragPoint = null;

//dragRadius is how close you have to be to center of point to actually be able to drag it
const numPoints = 5;
const dragRadius = 20;

function setup() {
  createCanvas(600, 600);
  strokeWeight(5);
  
  //for loop between 0 & num of points defined & for each of them, pushing a random vector into our point arrays. Passing to createVector function a random value between 0 and width for x & b/w 0 & height for y 
  for(let i = 0; i < numPoints; i++) {
    points.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(220);
  fill(255, 0, 0);
  
  //drawing a circle at x and y location that has a diameter that is the radius times 2
  for(let p of points) {
    circle(p.x, p.y, dragRadius * 2);
  }
}

//loop through points backwards through array so checking from top down ? | if mouse is in the circle, then bring the point just clicked on to the end of the array so it is brought to the top and stored into dragPoint so we know which point we are dragging
function mousePressed() {
  for(let i = points.length - 1; i >= 0; i--) {
    if(mouseInCircle(points[i], dragRadius)){
      dragPoint = points.splice(i, 1);
      dragPoint.x = mouseX;
      dragPoint.y = mouseY;
      //bring drag point to the front
      points.push(dragPoint);
      
      break;
    }
  }
}

//if drag point assigned, update x and y loc to be where the mouse is being dragged
function mouseDragged() {
  if(dragPoint){
    dragPoint.x = mouseX;
    dragPoint.y = mouseY;
  }
}

//once stopped clicking mouse button, stopped dragging it as well
function mouseReleased() {
  dragPoint = null;
}

//if distance b/w mouse and center of circle is less than radius, means that mouse is inside circle
function mouseInCircle(pos, radius) {
  return dist(mouseX, mouseY, pos.x, pos.y) < radius
}


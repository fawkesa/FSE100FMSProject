let exercise3x = 200;
let exercise3y = 200;

function game3Preload(){
  
}

function game3Setup(){
  background(220);
  currentActivity = 3;
  
  // Hide the Activity 3 button, show all the other buttons
  menuButton.show();
  game1Button.show();
  game2Button.show();
  game3Button.hide();
  game4Button.show();
  
  stroke(0);
  fill("red");
  circle(100,100, 200);
  fill("blue");
  rect(200,0, 200,200);
  fill("green");
  circle(300,300, 200);
  fill("yellow");
  rect(0,200, 200,200);
  noStroke();
}

function game3Draw(){
  
  exercise3x = exercise3x + random(4) - 2;
  exercise3y = exercise3y + random(4) - 2;
  
  fill(220);
  circle(exercise3x, exercise3y, 10);
}
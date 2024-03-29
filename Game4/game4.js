function game4Preload(){
  
}

function game4Setup(){
  background("white");
  currentActivity = 4;
  
  // Hide the Activity 4 button, show all the other buttons
  menuButton.show();
  game1Button.show();
  game2Button.show();
  game3Button.show();
  game4Button.hide();
}

function game4Draw(){
  background("white");
  
  fill("white");
  rect(10, 10, 100, 25);
  fill("black");
  text("Home Page", 25, 25);
  
  fill('black');
  text('Activity 4 goes here', 200, 200);
}

/*****
* Instead of using buttons like other games, this example draws 
* rectangles and circles. The mousePressed function determines if the
* user clicked on one of the shapes.
*****/
function game4MousePressed(){
  
}
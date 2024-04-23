/****
 * FSE100: examples for how to link multiple exercises together
 *****/

let currentActivity = 0;
let menuButton, game1Button, game2Button, game3Button, game4Button;

/***** 
  * If you want to load images or sounds into your application,
  * try using preload()
  * https://p5js.org/reference/#/p5/preload
  *****/
function preload(){
  game1Preload();
  game2Preload();
  game3Preload();
  game4Preload();

}

function switchToMM(){
  background(220);
  currentActivity = 0;
  
  //Show all the activity buttons
  menuButton.show();
  game1Button.show();
  game2Button.show();
  game3Button.show();
  game4Button.show();
}

function setup() {
  createCanvas(500, 500);
  background(220);

  //Create icon button for menu/home button
  menuButton = createImg("HomeButtonD.png");
  menuButton.position(0, 400);
  menuButton.mousePressed(switchToMM);
  menuButton.size(100, 100);
  
  game1Button = createButton('Game 1');
  game1Button.position(0, 0);
  game1Button.size(100, 100);
  game1Button.mousePressed(game1Setup);
  game1Button.show();
  
  game2Button = createButton('Game 2');
  game2Button.position(0, 100);
  game2Button.size(100,100);
  game2Button.mousePressed(game2Setup);
  game2Button.show();
  
  game3Button = createButton('Game 3');
  game3Button.position(0, 200);
  game3Button.size(100,100);
  game3Button.mousePressed(game3Setup);
  game3Button.show();
  
  game4Button = createButton('Game 4');
  game4Button.position(0, 300);
  game4Button.size(100,100);
  game4Button.mousePressed(game4Setup);
  game4Button.show();

}


function draw() {  
  switch(currentActivity){
    case 0: 
      mainMenu();
      break;
    case 1: 
      game1Draw();
      break;
    case 2: 
      game2Draw();
      break;
    case 3: 
      game3Draw();
      break;
    case 4: 
      game4Draw();
      break;
  }
}

function mainMenu(){
  background(220);
  menuButton.show();
  fill('black');
  textAlign(CENTER);
  textSize(19);
  let multilineText = "Welcome!\nChoose a game to the left!";
  text(multilineText, width / 2, height / 2);
}

/*****
* mousePressed() is a reserved function that is called whenever
* the user presses the mouse button in the application.
*****/
function mousePressed(){
  // Only game 4 uses the mousePressed function, but the switch statement
  // makes it easy to add the mousePressed functionality for other games.
  switch(currentActivity){
    case 2: 
      game2MousePressed();
      break;
    case 4: 
      game4MousePressed();
      break;
  }
}

function keyPressed(){
  switch(currentActivity){
    case 2:
      game2KeyPressed();
      break;
    case 3: 
      game3KeyPressed();
      break;
  }
  
}

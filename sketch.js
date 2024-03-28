//Created empty array to keep track of lines
var lines = []
var lineColor = 'green'
var clearBut
var previousDistance = 1000
previousColor = 'green'

function setup() {
  createCanvas(400, 400)
  frameRate(3)
  //Create button to clear canvas
  var options = createDiv().style('display: flex')
  clearBut = createButton('Clear').parent(options).style('width: 100px')

}

  function draw() { 
    background('gray')
    createStar()

         //color change testing :D 
         x = 200
         y = 100
         currentDistance = Math.sqrt((Math.pow(winMouseX - x, 2) + Math.pow(winMouseY - y, 2)), 2)
         if (currentDistance < previousDistance) {
           lineColor = 'green'
         } else {
            if (previousColor == 'green') {
             lineColor = 'yellow'
            }
            if (previousColor == 'yellow'){
             lineColor = 'red'
            }
           }
   

    //Clears line from canvas
    clearBut.mousePressed(function() {
      lines = []
    })

    //Draws line (adds line object to the array) if mouse is pressed
    if (mouseIsPressed) {
      var line = new myLine(lineColor.valueOf())
      lines.push(line)
    }

    for(var line of lines) {
      line.show()
    } 

    previousDistance = currentDistance
    previousColor = lineColor
} 


function createStar() {
  stroke('black')
  fill('black')
  circle(200, 100, 10)
  circle(325, 200, 10)
  circle(275, 350, 10)
  circle(125, 350, 10)
  circle(75, 200, 10)
}

/* Old Code
function mouseToGoalDot(int x, int y) {
  distance = Math.sqrt((Math.pow(winMouseX - x, 2) + Math.pow(winMouseY - y, 2)), 2)
  return distance
} 
*/
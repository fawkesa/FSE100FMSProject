var lines = []
var lineColor
var clearBut

function setup() {
  createCanvas(400, 400)
  
  var options = createDiv().style('display: flex')
  clearBut = createButton('Clear').parent(options).style('width: 100px')

}

  function draw() { 
    background('green')

    //clears line
    clearBut.mousePressed(function() {
      lines = []
    })

    //draws line is mouse is pressed
    if (mouseIsPressed) {
      var line = new myLine()
      lines.push(line)
    }

    for(var line of lines) {
      line.show()
    } 
} 

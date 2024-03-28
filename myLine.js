/* Created a line object for every line that is drawn. 
The line object needs 4 values: mouse's previous x & y & current x & y.
Line color is a property to the line object
Created a method that shows the line.
*/
class myLine {
    constructor(lineColor) {
        this.px = pwinMouseX
        this.py = pwinMouseY
        this.x = winMouseX
        this.y = winMouseY

        this.lineColor = lineColor
    }
    show() {
       stroke(this.lineColor)
       line(this.px, this.py, this.x, this.y)
    }
}

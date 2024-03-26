class myLine {
    constructor() {
        this.px = pwinMouseX
        this.py = pwinMouseY
        this.x = winMouseX
        this.y = winMouseY
    }
    show() {
       stroke('orange')
       line(this.px, this.py, this.x, this.y)
    }
}
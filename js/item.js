class Item {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = 10
        this.d = this.r * 2 
    }

    draw() {
        ctx.fillStyle = "purple"
        ctx.strokeStyle = "rgb(0,0,0,0)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, this.radian(360))
        ctx.stroke()
        ctx.fill()
    }

    clear() {
        // ctx.clearRect(this.x-this.radius, this.y-this.radius-2, 2*this.radius+2, 2*this.radius+2)
        ctx.clearRect(this.x-this.r, this.y-this.r, this.d, this.s)
    }

    radian(deg) {
        return (Math.PI / 180) * deg
    }
}

// function drawItems() {
//     for(let i=0; i<10; i++) {

//     }
// }
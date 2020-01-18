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
        console.log("clearing item")
        ctx.clearRect(this.x - this.r, this.y - this.r, this.d, this.s)
    }

    radian(deg) {
        return (Math.PI / 180) * deg
    }
}

function genCoords() {
    let num = Math.round(Math.random() * canvas.width)
    while (num % 10 !== 0) {
        num++
    }
    if((num/10) % 2 === 0) {
        while((num/10) % 2 === 0) {
            num += 10
        }
    }
    return num
}

// function drawItem() {
//     console.log(Math.random()*
// }
// function drawItems() {
//     for(let i=0; i<10; i++) {

//     }
// }
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

function genCoord() {
    let num = Math.round(Math.random() * canvas.width)
    while (num % 10 !== 0) {
        num++
    }
    if ((num / 10) % 2 === 0) {
        while ((num / 10) % 2 === 0) {
            num += 10
        }
    }

    return num
}

function onSnakeBody(genx, geny) {
    const snakeNodes = [snake.head, ...snake.body]
    for(let snakeNode of snakeNodes) {
        const { x, y} = snakeNode
        if(genx === x && geny === y) {
            return true
        }
    }
    return false
}

class Items {
    constructor(amount) {
        this.amount = amount
        // max items should be 5
        this.items = []
    }

    genCoords() {
        const x = genCoord()
        const y = genCoord()
        if (onSnakeBody(x, y)) {
            return this.genCoords()
        }
        return { x, y}
    }

    genItem() {
        const {x, y} = this.genCoords()
        const item = new Item(x, y)
        item.draw()
        this.items.push(item)
    }

    genItems() {
        for(let i=0; i<this.amount; i++) {
            this.genItem()
        }
    }
}


class SnakeNode {
    constructor(x, y, parent = null, isHead = false) {
        this.isHead = isHead
        this.size = 20
        this.prevX = 0
        this.prevY = 0
        this.x = x;
        this.y = y;
        this.parent = parent
    }
    draw() {
        ctx.fillStyle = this.isHead ? "red" : "green";
        ctx.fillRect(this.x, this.y, this.size, this.size)
    }

    move(x, y) {
        ctx.clearRect(this.x, this.y, this.size, this.size)
        this.updatePrevPos()
        if (this.isHead) {
            this.x += x * this.size
            this.y += y * this.size
        } else {
            this.x = this.parent.prevX
            this.y = this.parent.prevY
        }
        if(this.x >= canvas.width) {
            this.x = 0
        }
        if(this.x < 0) {
            this.x = canvas.width - this.size
        }
        if(this.y >= canvas.height) {
            this.y = 0
        }
        if(this.y < 0) {
            this.y = canvas.height - this.size
        }
        this.draw()
    }

    updatePrevPos() {
        this.prevX = this.x
        this.prevY = this.y
    }
}

class Snake {
    constructor() {
        this.head = new SnakeNode(400, 400, null, true)
        this.body = []
    }

    init(bodyLength = 4) {
        for (let i = 0; i < bodyLength; i++) {
            this.addNode();
        }
        this.draw();
    }

    addNode() {
        const bodyLength = this.body.length;
        if (bodyLength == 0) {
            const prevSnakeNode = this.head;
            this.body.push(new SnakeNode(prevSnakeNode.x - prevSnakeNode.size, prevSnakeNode.y, this.head))
            return
        }
        const prevSnakeNode = this.body[bodyLength - 1]
        this.body.push(new SnakeNode(prevSnakeNode.x - prevSnakeNode.size, prevSnakeNode.y, this.body[bodyLength - 1]))
        return
    }

    draw() {
        this.head.draw()
        this.body.forEach(snakeNode => snakeNode.draw())
    }

    move(x, y) {
        this.head.move(x, y)
        this.body.forEach(snakeNode => snakeNode.move(x, y))
    }
}
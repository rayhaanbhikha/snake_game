var canvas = document.getElementById('snake-game');
var ctx = canvas.getContext("2d");


class SnakeNode {
    constructor(x, y, parent = null, isHead = false, color) {
        this.color = color
        this.isHead = isHead
        this.size = 20
        this.prevX = 0
        this.prevY = 0
        this.x = x;
        this.y = y;
        this.parent = parent
    }
    draw() {
        if (this.color) {
            ctx.fillStyle = this.color
        } else {
            ctx.fillStyle = this.isHead ? "red" : "green";
        }
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
    addNode(color) {
        const bodyLength = this.body.length;
        if (bodyLength == 0) {
            const prevSnakeNode = this.head;
            this.body.push(new SnakeNode(prevSnakeNode.x - prevSnakeNode.size, prevSnakeNode.y, this.head, false, color))
            return
        }
        const prevSnakeNode = this.body[bodyLength - 1]
        this.body.push(new SnakeNode(prevSnakeNode.x - prevSnakeNode.size, prevSnakeNode.y, this.body[bodyLength - 1], false, color))
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

const snake = new Snake()

snake.addNode()
snake.addNode()
snake.addNode()
snake.addNode()
snake.addNode()
snake.draw()

window.addEventListener("keydown", (e) => {
    e.preventDefault()
    switch (e.key) {
        case 'ArrowUp':
            snake.move(0, -1)
            break;
        case 'ArrowDown':
            snake.move(0, 1)
            break;
        case 'ArrowRight':
            snake.move(1, 0)
            break;
        case 'ArrowLeft':
            snake.move(-1, 0)
            break;
    }
})

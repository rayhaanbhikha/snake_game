var canvas = document.getElementById('snake-game');
var ctx = canvas.getContext("2d");


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
        if (this.isHead) {
            ctx.clearRect(this.x, this.y, this.size, this.size)
            this.updatePrevPos()
            this.x += x;
            this.y += y;
            this.draw()
        } else {
            ctx.clearRect(this.x, this.y, this.size, this.size)
            this.updatePrevPos()
            this.x = this.parent.prevX;
            this.y = this.parent.prevY;
            this.draw();
        }
    }

    updatePrevPos() {
        this.prevX = this.x
        this.prevY = this.y
    }
}

class Snake {
    constructor() {
        this.head = new SnakeNode(50, 50, null, true)
        this.body = []
    }
    addNode() {
        const bodyLength = this.body.length;
        if (bodyLength == 0) {
            const prevSnakeNode = this.head;
            this.body.push(new SnakeNode(prevSnakeNode.x - prevSnakeNode.size - 0.5, prevSnakeNode.y, this.head))
            return
        }
        const prevSnakeNode = this.body[bodyLength - 1]
        this.body.push(new SnakeNode(prevSnakeNode.x - prevSnakeNode.size - 0.5, prevSnakeNode.y, this.body[bodyLength - 1]))
        return

    }

    draw() {
        this.head.draw()
        this.body.forEach(snakeNode => snakeNode.draw())
    }

    move(x, y) {
        this.head.move(x, y)
        this.body.forEach(snakeNode => snakeNode.move())
    }

}

const snake = new Snake()

snake.addNode()
snake.addNode()
snake.draw()

window.addEventListener("keydown", (e) => {
    e.preventDefault()
    const speed = 5
    switch (e.key) {
        case 'ArrowUp':
            snake.move(0, -1 * speed)
            break;
        case 'ArrowDown':
            snake.move(0, 1 * speed)
            break;
        case 'ArrowRight':
            snake.move(1 * speed, 0)
            break;
        case 'ArrowLeft':
            snake.move(-1 * speed, 0)
            break;
    }
})

var control = document.getElementById('control')
var canvas = document.getElementById('snake-game');
var ctx = canvas.getContext("2d");
var animationIDs = []
var cancelled = false;

const snake = new Snake()
snake.init()

const item = new Item(30, 30)
item.draw()

function moveConstantly() {
    snake.move()
    if (!cancelled) {
        setTimeout(() => {
            console.log("new animation Id")
            checkItemCollisions()
            animationIDs.push(requestAnimationFrame(moveConstantly));
        }, 150)
    }
}

function checkItemCollisions() {
    const xMin = item.x - item.r
    const xMax = item.x + item.r
    const yMin = item.y - item.r
    const yMax = item.y + item.r
    if ((snake.head.x <= xMax && snake.head.x >= xMin) && 
        (snake.head.y <= yMax && snake.head.y >= yMin)) {
        console.log("COLLISION")
        item.clear()
        delete item
        snake.addNode()
    }
}

function startGame() {
    cancelled = false
    animationIDs.push(requestAnimationFrame(moveConstantly));
}

function stopGame() {
    cancelled = true
    animationIDs.forEach(cancelAnimationFrame)
}

control.addEventListener('click', e => {
    const currentVal = e.target.innerText
    let newVal;
    if (currentVal == "start") {
        startGame()
        newVal = "stop"
    } else {
        stopGame()
        newVal = "start"
    }

    e.target.innerText = newVal
})

window.addEventListener("keydown", (e) => {
    e.preventDefault()
    switch (e.key) {
        case 'ArrowUp':
            snake.changeDirection(0, -1)
            break;
        case 'ArrowDown':
            snake.changeDirection(0, 1)
            break;
        case 'ArrowRight':
            snake.changeDirection(1, 0)
            break;
        case 'ArrowLeft':
            snake.changeDirection(-1, 0)
            break;
    }
})


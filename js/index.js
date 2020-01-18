var control = document.getElementById('control')
var canvas = document.getElementById('snake-game');
var ctx = canvas.getContext("2d");
var animationIDs = []
var cancelled = false;

const snake = new Snake()
snake.init()

const items = new Items(10, snake)
items.genItems()

function moveConstantly() {
    snake.move()
    if (!cancelled) {
        setTimeout(() => {
            console.log("new animation Id")
            items.checkCollisions()
            animationIDs.push(requestAnimationFrame(moveConstantly));
        }, 150)
    }
}

function keyboardEvents(e) {
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
}

function startGame() {
    cancelled = false
    animationIDs.push(requestAnimationFrame(moveConstantly));
    window.addEventListener("keydown", keyboardEvents)
}

function stopGame() {
    cancelled = true
    animationIDs.forEach(cancelAnimationFrame)
    window.removeEventListener("keydown", keyboardEvents)
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


var control = document.getElementById('control')
var canvas = document.getElementById('snake-game');
var ctx = canvas.getContext("2d");
var animationIDs = []
var cancelled = false;

const snake = new Snake()
snake.init()

function moveConstantly() {
    snake.move()
    if(!cancelled) {
        setTimeout(() => {
            console.log("new animation Id")
            animationIDs.push(requestAnimationFrame(moveConstantly));
        }, 150)
    }
}

control.addEventListener('click', e => {
    const currentVal = e.target.innerText
    let newVal;
    if (currentVal == "start") {
        cancelled = false
        animationIDs.push(requestAnimationFrame(moveConstantly));
        newVal = "stop"
    } else {
        cancelled = true
        animationIDs.forEach(cancelAnimationFrame)
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

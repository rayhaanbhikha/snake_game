var canvas = document.getElementById('snake-game');
var ctx = canvas.getContext("2d");

const snake = new Snake()

snake.init()

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

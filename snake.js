const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
// console.log(ctx);
let paused = false;

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];

snake[0] = {

    x: (Math.floor(Math.random() * columns)) * scale,
    y: (Math.floor(Math.random() * rows)) * scale
}
let food = {

    x: (Math.floor(Math.random() * columns)) * scale,
    y: (Math.floor(Math.random() * rows)) * scale
}


let d = "right";
document.onkeydown = direction;

function direction(event) {
    let key = event.keyCode;

    if (key == 37 && d != "right") d = "left";
    else if (key == 38 && d != "down") d = "up";
    else if (key == 39 && d != "left") d = "right";
    else if (key == 40 && d != "up") d = "down";
    else if (key == 32) { // Spacebar to pause/resume
        paused = !paused;
    }
}

let playGame = setInterval(draw, 100);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (paused) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Paused", canvas.width / 2 - 50, canvas.height / 2);
        return; // Skip updating when paused
    }


    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = "#08d42aff";
        ctx.strokeStyle = "red";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 20);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 20);
        ctx.fillText("High Score: " + highScore, 10, 45);


    }


    ctx.fillStyle = "rgba(243, 78, 2, 1)";
    ctx.strokeStyle = "black";
    ctx.fillRect(food.x, food.y, scale, scale);
    ctx.strokeRect(food.x, food.y, scale, scale);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    // console.log(snakeX);
    if (d == "left") snakeX -= scale;
    if (d == "right") snakeX += scale;
    if (d == "up") snakeY -= scale;
    if (d == "down") snakeY += scale;
    if (snakeX > canvas.width) {
        snakeX = 0;
    }
    if (snakeY > canvas.height) {
        snakeY = 0;
    }
    if (snakeX < 0) {
        snakeX = canvas.width;
    }
    if (snakeY < 0) {
        snakeY = canvas.height;
    }


    if (snakeX == food.x && snakeY == food.y) {
        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }

        food = {

            x: (Math.floor(Math.random() * columns)) * scale,
            y: (Math.floor(Math.random() * rows)) * scale
        }
    } else {
        snake.pop();
    }
    let newHead = {
        x: snakeX,
        y: snakeY

    }
    if (eatSelf(newHead, snake)) {
        clearInterval(playGame);
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
        // Reset score
        score = 0;
        return;
    }

    snake.unshift(newHead);
}

function eatSelf(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;

}
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
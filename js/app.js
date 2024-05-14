const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-btn');
const backgroundMusic = document.getElementById('background-music');

let snake = [];
let food = {};
let direction = 'right';
let gameOver = false;
let score = 0;

// Set up canvas dimensions
canvas.width = 400;
canvas.height = 400;
const tileSize = 20;

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, tileSize, tileSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, tileSize, tileSize);
}

function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case 'up':
            head.y -= tileSize;
            break;
        case 'down':
            head.y += tileSize;
            break;
        case 'left':
            head.x -= tileSize;
            break;
        case 'right':
            head.x += tileSize;
            break;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize;
    const y = Math.floor(Math.random() * (canvas.height / tileSize)) * tileSize;
    food = { x, y };
}

function checkGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            break;
        }
    }
}

function gameLoop() {
    if (gameOver) {
        clearInterval(gameLoopInterval);
        alert(`Game Over! Your score is ${score}`);
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
    checkGameOver();
}

let gameLoopInterval;

function startGame() {
    snake = [{ x: 200, y: 200 }];
    direction = 'right';
    generateFood();
    gameOver = false;
    score = 0;
    scoreElement.textContent = score;
    if (gameLoopInterval) clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(gameLoop, 100);
    backgroundMusic.play();
}

startButton.addEventListener('click', startGame);

document.addEventListener('keydown', event => {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    } else if (key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
});

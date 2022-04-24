// alert('hello');
const canvas = document.getElementById("canvas");
console.log(canvas);
const ctx = canvas.getContext("2d");
const canvasH = canvas.height;
const canvasW = canvas.width;

let paddle = { h: 50, w: 5 };
let leftPaddle = (rightPaddle = ball = {});
let score = 0;
let increment = 0.2;

setInitialVariables();
drawBall();
drawLeftPaddle();
drawRightPaddle();
drawScore();
drawCenterLine();
moveBall();
moveLeftPaddle();

function setInitialVariables() {
    ball = { x: 100, y: 100, r: 10, dx: 2, dy: 1 };
    leftPaddle = { x: 0, y: 125 };
    rightPaddle = { x: canvasW - 5, y: 125 };
}

function moveLeftPaddle() {
    document.addEventListener("mousemove", (e) => {
        leftPaddle.y = e.screenY - 200;
    });
}

function detectCollision() {
    //   Detect Right Paddle Collision
    if (ball.x > rightPaddle.x - ball.r) {
        ball.dx = -ball.dx;
    }

    //   Detect Left Paddle Collision
    if (
        ball.x < 0 + ball.r + paddle.w &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y + paddle.h
    ) {
        ball.dx = -ball.dx + 2 * increment;
        ball.dy += increment;
        score++;
    }

    // Detect Top or Bottom Collision
    if (ball.y > canvasH - ball.r || ball.y < 0 + ball.r) {
        ball.dy = -ball.dy;
    }

    // Detect Left Collision
    if (ball.x < 0 + ball.r) {
        alert("You Loose !");
        setInitialVariables();
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    rightPaddle.y = ball.y - paddle.h / 2;

    ctx.clearRect(0, 0, canvasW, canvasH);

    detectCollision();

    drawBall();
    drawScore();
    drawCenterLine();
    drawLeftPaddle();
    drawRightPaddle();

    requestAnimationFrame(moveBall);
}

function drawRightPaddle() {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.rect(rightPaddle.x, rightPaddle.y, paddle.w, paddle.h,'#0f0');
    ctx.stroke();
    ctx.closePath();
}
function drawLeftPaddle() {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.rect(leftPaddle.x, leftPaddle.y, paddle.w, paddle.h);
    ctx.stroke();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}

function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = "#f00";
    ctx.fill();
    ctx.fillText("Player Score: " + score, 20, 10);
    ctx.closePath();
}

function drawCenterLine() {
    ctx.moveTo(canvasW / 2, 0);
    ctx.stroke();
    ctx.closePath();
}
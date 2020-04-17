const cvs = document.getElementById("canvas");
const ctx = cvs.getContext('2d');
const restartBtn = document.getElementById('restart');

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
pipeBottom.onload = draw;

let bump = false;
let speed = 1;
let score = 0;
let topScore = localStorage.getItem('top');
if (!topScore) topScore = 0;

const pipe = [];
let gap = 150;

pipe[0] = {
    x: cvs.width,
    y: -100,
};

let birdX = 10;
let birdY = 150;
let gravity = 0.5;

function moveUp() {
    birdY -= 20;
}

document.addEventListener("keydown" , moveUp);
document.addEventListener("touchstart" , moveUp);

function draw() {

    ctx.drawImage(bg, 0, 0);
    drawPipes();
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, birdX, birdY);
    birdY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт: " + score, 20, cvs.height - 70);
    if (score > topScore) {
        topScore = score;
        localStorage.setItem('top', topScore);
    }
    ctx.fillText("Рекорд: " + topScore, 20, cvs.height - 30);

    bump ? gameOver() : requestAnimationFrame(draw);
}

function drawPipes() {
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x,
            pipe[i].y + pipeUp.height + gap);

        pipe[i].x = pipe[i].x - speed;

        if (pipe[i].x === 10) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height)
                    - pipeUp.height
            });
        }

        if (pipe[i].x === 0) score++;

        checkBump(i);
    }
}

function checkBump(i) {
    if (birdY + bird.height > cvs.height - fg.height) {
        bump = true;
    }

    if (birdY < 0) birdY = 0;

    if (birdX + bird.width > pipe[i].x) {
        if (birdX < pipe[i].x + pipeUp.width) {
            if (birdY < pipe[i].y + pipeUp.height) bump = true;
            if (birdY + bird.height > pipe[i].y + pipeUp.height + gap) bump = true;
        }
    }
}

function gameOver() {
    cvs.style.filter = "grayscale(100%)";
    restartBtn.style.display = 'block';
    restartBtn.addEventListener('click', () => {
        restartBtn.style.background = 'linear-gradient(green,lightgreen)';
        window.location.reload();
    })
}
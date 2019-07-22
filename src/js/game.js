const cvs = document.getElementById("canvas");
const ctx = cvs.getContext('2d');

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

//создание блоков
const pipe = [];
const gap = 150;

pipe[0] = {
    x: cvs.width,
    y: 0,
};


document.addEventListener("keydown", moveUp);
document.addEventListener('touchstart', moveUp);

function moveUp() {
    birdY -= 20;
}



let score = 0;


// Позиция птички
let birdX = 10;
let birdY = 150;
const gravity = 0.5;


function draw() {
    ctx.drawImage(bg, 0, 0);

    //отрисовываем трубы

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x === 0) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        //отслеживание прикосновений

        if (birdX + bird.width >= pipe[i].x
            && birdX <= pipe[i].x + pipeUp.width){

            if (birdY <= pipe[i].y + pipeUp.height
                || birdY + bird.height >= pipe[i].y + pipeUp.height + gap){
                location.reload();
            }

        }
            // && birdY <= pipe[i].y

            if( birdY + bird.height >= cvs.height - fg.height){
                location.reload()
            }

        if (pipe[i].x === 5) {
            score++;
        }
        }


    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, birdX, birdY );

    birdY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счёт: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}





/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable indent */

const originHTML = document.body.innerHTML;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 87:
            sessionStorage.setItem("direcction", "up");
            break;
        case 65:
            sessionStorage.setItem("direcction", "left");
            break;
        case 68:
            sessionStorage.setItem("direcction", "right");
            break;
        case 83:
            sessionStorage.setItem("direcction", "down");
            break;
        case 37:
            sessionStorage.setItem("direcction", "left");
            break;
        case 38:
            sessionStorage.setItem("direcction", "up");
            break;
        case 39:
            sessionStorage.setItem("direcction", "right");
            break;
        case 40:
            sessionStorage.setItem("direcction", "down");
            break;
        default:
    }
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateFruit(ctx, fieldWidth, fieldHeight, ubicationSnake) {
    let check = false;

    let fruitX;
    let fruitY;
    let ubicationFruit;

    while (check === false) {
        const rfruitX = getRandomNumber(0, fieldWidth / 100);
        const rfruitY = getRandomNumber(0, fieldHeight / 100);

        fruitX = 50 + (rfruitX * 100);
        fruitY = 50 + (rfruitY * 100);

        ubicationFruit = [fruitX, fruitY];

        if (ubicationSnake !== ubicationFruit) {
            check = true;
        }
    }
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.arc(fruitX, fruitY, 25, 0, Math.PI * 2, true);
    ctx.fill();

    return ubicationFruit;
}

function gameOver(ctx, fieldWidth, fieldHeight, points) {
    sessionStorage.clear();
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, fieldWidth + 50, fieldHeight + 50);

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "100px serif";
    ctx.fillText("GAME OVER!", fieldWidth / 4, fieldHeight / 2);

    ctx.font = "50px serif";
    ctx.fillText(`Points: ${points}`, fieldWidth / 4 + 225, fieldHeight / 2 + 100);

    const btn = document.createElement("button");
    btn.textContent = "Restart";
    btn.classList.add("btn-restart");
    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
        document.body.innerHTML = originHTML;
        main();
    });

    return true;
}

async function play(ctx, fieldWidth, fieldHeight, ubicationSnake, ubicationFruit, speed, points) {
    let exit = false;
    while (exit === false) {
        let ubicationSnakeX = ubicationSnake[0];
        let ubicationSnakeY = ubicationSnake[1];

        await sleep(parseInt(speed));

        ctx.beginPath();
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.arc(ubicationSnakeX, ubicationSnakeY, 27, 0, Math.PI * 2, true);
        ctx.fill();

        switch (sessionStorage.getItem("direcction")) {
            case ("up"):
                if (ubicationSnakeY === 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight, points);
                    return;
                }

                ubicationSnakeY -= 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationSnakeX, ubicationSnakeY, 26, 0, Math.PI * 2, true);
                ctx.fill();

                ubicationSnake = [ubicationSnakeX, ubicationSnakeY];
                break;
            case ("down"):
                if (ubicationSnakeY === fieldHeight - 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight, points);
                    return;
                }

                ubicationSnakeY += 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationSnakeX, ubicationSnakeY, 26, 0, Math.PI * 2, true);
                ctx.fill();

                ubicationSnake = [ubicationSnakeX, ubicationSnakeY];
                break;
            case ("right"):

                if (ubicationSnakeX === fieldWidth - 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight, points);
                    return;
                }

                ubicationSnakeX += 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationSnakeX, ubicationSnakeY, 26, 0, Math.PI * 2, true);
                ctx.fill();

                ubicationSnake = [ubicationSnakeX, ubicationSnakeY];
                break;
            case ("left"):

                if (ubicationSnakeX === 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight, points);
                    return;
                }

                ubicationSnakeX -= 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationSnakeX, ubicationSnakeY, 26, 0, Math.PI * 2, true);
                ctx.fill();

                ubicationSnake = [ubicationSnakeX, ubicationSnakeY];
                break;
            default:
        }
        if (ubicationSnake[0] === ubicationFruit[0] && ubicationSnake[1] === ubicationFruit[1]) {
            ctx.clearRect(10, 810, 500, 30);
            points++;
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.font = "30px serif";
            ctx.fillText(`Points: ${points}`, 10, 830);
            ubicationFruit = generateFruit(ctx, fieldWidth, fieldHeight);
        }
    }
}

function main() {
    const playBtn = document.getElementById("play");
    playBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const radios = document.querySelectorAll(".radio");
        let speed;
        radios.forEach((radio) => {
            if (radio.checked === true) {
                speed = radio.value;
            }
        });

        document.getElementById("form").remove();

        const canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

            const fieldWidth = 1200;
            const fieldHeight = 800;

            let points = 0;

            sessionStorage.setItem("direcction", "right");

            let ubicationSnake = [50, 50];

            ctx.strokeStyle = "rgb(30,105,26)";
            ctx.lineWidth = 8;
            ctx.strokeRect(0, 0, fieldWidth, fieldHeight);

            ctx.lineWidth = 4;
            ctx.strokeStyle = "rgb(73,183,69)";

            for (let ih = 0; ih < fieldHeight; ih += 100) {
                for (let iw = 0; iw < fieldWidth; iw += 100) {
                    ctx.strokeRect(iw, ih, 100, 100);
                }
            }

            const ubicationFruit = generateFruit(ctx, fieldWidth, fieldHeight, ubicationSnake);

            ctx.beginPath();
            ctx.fillStyle = "rgb(56,138,54)";
            ctx.arc(ubicationSnake[0], ubicationSnake[1], 26, 0, Math.PI * 2, true);
            ctx.fill();

            ctx.fillStyle = "rgb(0,0,0)";
            ctx.font = "30px serif";
            ctx.fillText(`Points: ${points}`, 10, 830);

            play(ctx, fieldWidth, fieldHeight, ubicationSnake, ubicationFruit, speed, points);
        }
    });
}

main();

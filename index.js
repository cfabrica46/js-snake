/* eslint-disable indent */

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

function generateFruit(ctx, fieldWidth, fieldHeight) {
    let check = false;

    let fruitX;
    let fruitY;

    while (check === false) {
        const rfruitX = getRandomNumber(1, fieldWidth / 100);
        const rfruitY = getRandomNumber(1, fieldHeight / 100);

        fruitX = 50 + (rfruitX * 100);
        fruitY = 50 + (rfruitY * 100);

        sessionStorage.setItem("ubicationFruit", `${fruitX}-${fruitY}`);

        if (sessionStorage.getItem("ubicationSnake") !== sessionStorage.getItem("ubicationFruit")) {
            check = true;
        }
    }

    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.arc(fruitX, fruitY, 25, 0, Math.PI * 2, true);
    ctx.fill();
}

function gameOver(ctx, fieldWidth, fieldHeight) {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, fieldWidth + 50, fieldHeight + 50);

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "100px serif";
    ctx.fillText("GAME OVER!", fieldWidth / 4, fieldHeight / 2);

    ctx.font = "50px serif";
    ctx.fillText(`Points: ${sessionStorage.getItem("points")}`, fieldWidth / 4 + 225, fieldHeight / 2 + 100);
    return true;
}

async function play(ctx, fieldWidth, fieldHeight) {
    let exit = false;
    while (exit === false) {

        const u = sessionStorage.getItem("ubicationSnake").split("-");
        let ubicationSnakeX = parseInt(u[0], 10);
        let ubicationSnakeY = parseInt(u[1], 10);

        await sleep(parseInt(sessionStorage.getItem("speed")));

        ctx.beginPath();
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.arc(ubicationSnakeX, ubicationSnakeY, 26, 0, Math.PI * 2, true);
        ctx.fill();

        switch (sessionStorage.getItem("direcction")) {
            case ("up"):
                if (ubicationSnakeY === 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight);
                    return;
                }

                ubicationSnakeY -= 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationSnakeX, ubicationSnakeY, 25, 0, Math.PI * 2, true);
                ctx.fill();

                sessionStorage.setItem("ubicationSnake", `${ubicationSnakeX}-${ubicationSnakeY}`);
                break;
            case ("down"):
                if (ubicationSnakeY === fieldHeight - 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight);
                    return;
                }

                ubicationSnakeY += 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationSnakeX, ubicationSnakeY, 25, 0, Math.PI * 2, true);
                ctx.fill();

                sessionStorage.setItem("ubicationSnake", `${ubicationSnakeX}-${ubicationSnakeY}`);
                break;
            case ("right"):

                if (ubicationSnakeX === fieldWidth - 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight);
                    return;
                }

                ubicationSnakeX += 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationSnakeX, ubicationSnakeY, 25, 0, Math.PI * 2, true);
                ctx.fill();

                sessionStorage.setItem("ubicationSnake", `${ubicationSnakeX}-${ubicationSnakeY}`);
                break;
            case ("left"):

                if (ubicationSnakeX === 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight);
                    return;
                }

                ubicationSnakeX -= 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationSnakeX, ubicationSnakeY, 25, 0, Math.PI * 2, true);
                ctx.fill();

                sessionStorage.setItem("ubicationSnake", `${ubicationSnakeX}-${ubicationSnakeY}`);
                break;
            default:
        }

        if (sessionStorage.getItem("ubicationSnake") === sessionStorage.getItem("ubicationFruit")) {
            ctx.clearRect(10, 810, 110, 30);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.font = "30px serif";
            ctx.fillText(`Points: ${sessionStorage.getItem("points")}`, 10, 830);
            sessionStorage.setItem("points", parseInt(sessionStorage.getItem("points"), 10) + 1);
            generateFruit(ctx, fieldWidth, fieldHeight);
        }
    }
}

const playBtn = document.getElementById("play");
playBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const radios = document.querySelectorAll(".radio");

    radios.forEach((radio) => {
        if (radio.checked === true) {
            sessionStorage.setItem("speed", radio.value);
        }
    });

    document.getElementById("form").remove();

    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        const fieldWidth = 1200;
        const fieldHeight = 800;

        sessionStorage.setItem("points", "0");

        sessionStorage.setItem("direcction", "right");
        sessionStorage.setItem("ubicationSnake", "50-50");

        const u = sessionStorage.getItem("ubicationSnake").split("-");

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

        generateFruit(ctx, fieldWidth, fieldHeight);

        ctx.beginPath();
        ctx.fillStyle = "rgb(56,138,54)";
        ctx.arc(u[0], u[1], 25, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.font = "30px serif";
        ctx.fillText(`Points: ${sessionStorage.getItem("points")}`, 10, 830);

        play(ctx, fieldWidth, fieldHeight);
    }
});

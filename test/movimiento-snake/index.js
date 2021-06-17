/* eslint-disable indent */

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

function gameOver(ctx, fieldWidth, fieldHeight) {
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, fieldWidth + 50, fieldHeight + 50);
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "100px serif";
    ctx.fillText("GAME OVER!", fieldWidth / 4, fieldHeight / 2);
    return true;
}

async function demo(ctx, fieldWidth, fieldHeight) {
    let exit = false;
    while (exit === false) {
        const u = sessionStorage.getItem("ubication").split("-");
        let ubicationX = parseInt(u[0], 10);
        let ubicationY = parseInt(u[1], 10);

        await sleep(500);

        switch (sessionStorage.getItem("direcction")) {
            case ("up"):
                if (ubicationY === 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight);
                    return;
                }

                ctx.beginPath();
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.arc(ubicationX, ubicationY, 26, 0, Math.PI * 2, true);
                ctx.fill();

                ubicationY -= 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationX, ubicationY, 25, 0, Math.PI * 2, true);
                ctx.fill();

                sessionStorage.setItem("ubication", `${ubicationX}-${ubicationY}`);
                break;
            case ("down"):
                if (ubicationY === fieldHeight - 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight);
                    return;
                }

                ctx.beginPath();
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.arc(ubicationX, ubicationY, 26, 0, Math.PI * 2, true);
                ctx.fill();

                ubicationY += 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationX, ubicationY, 25, 0, Math.PI * 2, true);
                ctx.fill();

                sessionStorage.setItem("ubication", `${ubicationX}-${ubicationY}`);
                break;
            case ("right"):

                if (ubicationX === fieldWidth - 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight);
                    return;
                }

                ctx.beginPath();
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.arc(ubicationX, ubicationY, 26, 0, Math.PI * 2, true);
                ctx.fill();

                ubicationX += 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationX, ubicationY, 25, 0, Math.PI * 2, true);
                ctx.fill();

                sessionStorage.setItem("ubication", `${ubicationX}-${ubicationY}`);
                break;
            case ("left"):

                if (ubicationX === 50) {
                    exit = gameOver(ctx, fieldWidth, fieldHeight);
                    return;
                }

                ctx.beginPath();
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.arc(ubicationX, ubicationY, 26, 0, Math.PI * 2, true);
                ctx.fill();

                ubicationX -= 100;

                ctx.beginPath();
                ctx.fillStyle = "rgb(56,138,54)";
                ctx.arc(ubicationX, ubicationY, 25, 0, Math.PI * 2, true);
                ctx.fill();

                sessionStorage.setItem("ubication", `${ubicationX}-${ubicationY}`);
                break;
            default:
        }
    }
}

const canvas = document.getElementById("canvas");
if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    const fieldWidth = 1200;
    const fieldHeight = 800;

    sessionStorage.setItem("direcction", "right");
    sessionStorage.setItem("ubication", "50-50");

    const u = sessionStorage.getItem("ubication").split("-");

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

    ctx.beginPath();
    ctx.fillStyle = "rgb(56,138,54)";
    ctx.arc(u[0], u[1], 25, 0, Math.PI * 2, true);
    ctx.fill();

    demo(ctx, fieldWidth, fieldHeight);
}

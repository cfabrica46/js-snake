/* eslint-disable indent */
// function getRandomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demo(ctx, fieldWidth, fieldHeight) {
    let exit = false;
    while (exit === false) {
        //     const rWidth = getRandomNumber(0, fieldWidth / 100);
        //     const rHeight = getRandomNumber(0, fieldHeight / 100);
        //
        //     ctx.beginPath();
        //     ctx.fillStyle = "rgb(255,0,0)";
        //     ctx.arc(50 + (rWidth * 100), 50 + (rHeight * 100), 25, 0, Math.PI * 2, true);
        //     ctx.fill();
        //
        const u = sessionStorage.getItem("ubication").split("-");
        let ubicationX = parseInt(u[0], 10);
        let ubicationY = parseInt(u[1], 10);

        await sleep(1000);

        switch (sessionStorage.getItem("direcction")) {
            case ("up"):
                if (ubicationY === 50) {
                    console.log("Game Over");
                    exit = true;
                    break;
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

                sessionStorage.setItem("ubication", `50-${ubicationY}`);
                break;
            case ("down"):
                if (ubicationY === fieldHeight - 50) {
                    console.log("Game Over");
                    exit = true;
                    break;
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

                sessionStorage.setItem("ubication", `50-${ubicationY}`);
                break;
            case ("right"):

                if (ubicationX === fieldWidth - 50) {
                    console.log("Game Over");
                    exit = true;
                    break;
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

                sessionStorage.setItem("ubication", `${ubicationX}-50`);
                break;
            case ("left"):

                if (ubicationX === 50) {
                    console.log("Game Over");
                    exit = true;
                    break;
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

                sessionStorage.setItem("ubication", `${ubicationX}-50`);
                break;
            default:
        }

        //
        //     ctx.beginPath();
        //     ctx.fillStyle = "rgb(255,255,255)";
        //     ctx.arc(50 + (rWidth * 100), 50 + (rHeight * 100), 26, 0, Math.PI * 2, true);
        //     ctx.fill();
    }
}

const canvas = document.getElementById("canvas");
if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    const fieldWidth = 1200;
    const fieldHeight = 800;

    sessionStorage.setItem("direcction", "left");
    sessionStorage.setItem("ubication", "50-50");

    const u = sessionStorage.getItem("ubication").split("-");

    console.log(u);

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

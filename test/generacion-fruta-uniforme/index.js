/* eslint-disable no-await-in-loop */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demo(ctx, fieldWidth, fieldHeight) {
    for (let ih = 50; ih < fieldHeight; ih += 100) {
        for (let iw = 50; iw < fieldWidth; iw += 100) {
            ctx.beginPath();
            ctx.fillStyle = "rgb(255,0,0)";
            ctx.arc(iw, ih, 25, 0, Math.PI * 2, true);
            ctx.fill();

            await sleep(1000);

            ctx.beginPath();
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.arc(iw, ih, 26, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
}

const canvas = document.getElementById("canvas");
if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    const fieldWidth = 1200;
    const fieldHeight = 800;

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

    demo(ctx, fieldWidth, fieldHeight);
}

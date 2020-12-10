function drawParabola (x, y, k = 0.03) {
    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();
    for (let val = x; val <= CANVAS_HEIGHT; val += 1) {
        ctx.lineTo(val, k * val ** 2);
    }
    ctx.lineWidth = 0.5
    ctx.stroke();
    ctx.closePath();

    ctx.moveTo(x, y);
    ctx.beginPath();
    for (let val = x; val <= CANVAS_HEIGHT; val += 1) {
        ctx.lineTo(-val, k * val ** 2);
    }
    ctx.lineWidth = 0.5
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
}
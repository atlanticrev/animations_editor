function drawSineWave (amp = 100, freq = 0.01) {
    ctx.beginPath();
    for (let x = 0; x < CANVAS_WIDTH; x += 1) {
        ctx.lineTo(x, amp * Math.sin(freq * x));
    }
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.closePath();
}
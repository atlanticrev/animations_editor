class Canvas {

    static get defaults () {
        return {
            width: 800,
            height: 600
        };
    }

    constructor (el = document.querySelector('canvas'), options = {}) {

        if (!el) {
            throw new Error('There is no canvas element in this document');
        }

        Object.assign(this, Canvas.defaults, options);

        /**
         * @name width
         * @type {number}
         * @memberOf Canvas#
         */

        /**
         * @name height
         * @type {number}
         * @memberOf Canvas#
         */

        /**
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = el.getContext('2d');

        el.width = this.width;
        el.height = this.height;

        el.style.setProperty('--width', `${this.width}px`);
        el.style.setProperty('--height', `${this.height}px`);

        // el.addEventListener('resize', this.onResize);

        // @todo Move to config (init objects on the scene)
        this.objectsToDraw = [];

        for (let i = 0; i < 2500; i++) {
            this.objectsToDraw.push(new Particle({
                r: rand(1, 1300),
                angDeg: rand(0, 360),
                angVel: rand(0.05, 0.1),
                angAccel: 0,
                size: rand(0.1, 1)
            }));
        }

        this.ctx.strokeStyle = '#797570';
        this.ctx.fillStyle = '#797570';

    }

    toLeftBottomCoords () {
        // this.ctx.save();
        // this.ctx.translate(0, this.height);
        // this.ctx.scale(1, -1);
    }

    toCenterCoords () {
        this.ctx.save();
        this.ctx.scale(1, -1);
        this.ctx.translate(this.width / 2, -this.height / 2);
    }

    toPrevCoords () {
        this.ctx.restore();
    }

    onResize () {}

    clearScene () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    recalculateScene () {
        // @todo Move to separate Animation object?
        // New positions evaluation
        for (let object of this.objectsToDraw) {
            object.angVel += object.angAccel;
            object.angDeg = (object.angDeg + object.angVel) % 360;
        }
    }

    drawAxis () {
        // // Left x-axis
        // ctx.beginPath();
        // ctx.moveTo(0, 0);
        // ctx.lineTo(-CANVAS_WIDTH / 2, 0);
        // ctx.stroke();
        // ctx.closePath();
        //
        // for (let x = -38; x >= -CANVAS_WIDTH / 2; x -= 38) {
        //     // console.log('here');
        //     ctx.beginPath();
        //     ctx.moveTo(x, -3);
        //     ctx.lineTo(x, 3);
        //     ctx.stroke();
        //     ctx.closePath();
        // }
        //
        // // Right x-axis
        // ctx.beginPath();
        // ctx.moveTo(0, 0);
        // ctx.lineTo(CANVAS_WIDTH / 2, 0);
        // ctx.stroke();
        // ctx.closePath();
        //
        // for (let x = 38; x <= CANVAS_WIDTH / 2; x += 38) {
        //     // console.log('here');
        //     ctx.beginPath();
        //     ctx.moveTo(x, -3);
        //     ctx.lineTo(x, 3);
        //     ctx.stroke();
        //     ctx.closePath();
        // }
        //
        // // Top y-axis
        // ctx.beginPath();
        // ctx.moveTo(0, 0);
        // ctx.lineTo(0, CANVAS_HEIGHT / 2);
        // ctx.stroke();
        // ctx.closePath();
        //
        // for (let y = 38; y <= CANVAS_HEIGHT / 2; y += 38) {
        //     // console.log('here');
        //     ctx.beginPath();
        //     ctx.moveTo(-3, y);
        //     ctx.lineTo(3, y);
        //     ctx.stroke();
        //     ctx.closePath();
        // }
        //
        // // Bottom y-axis
        // ctx.beginPath();
        // ctx.moveTo(0, 0);
        // ctx.lineTo(0, -CANVAS_HEIGHT / 2);
        // ctx.stroke();
        // ctx.closePath();
        //
        // for (let y = -38; y >= -CANVAS_HEIGHT / 2; y -= 38) {
        //     // console.log('here');
        //     ctx.beginPath();
        //     ctx.moveTo(-3, y);
        //     ctx.lineTo(3, y);
        //     ctx.stroke();
        //     ctx.closePath();
        // }

        const CELL_STROKE = 0.15;
        const AXIS_STROKE = 0.25;
        const CELL_INTERVAL = 38;

        // Left x-axis
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(-this.width / 2, 0);
        this.ctx.lineWidth = AXIS_STROKE;
        this.ctx.stroke();
        this.ctx.closePath();

        for (let x = -CELL_INTERVAL; x >= -this.width / 2; x -= CELL_INTERVAL) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, -this.height / 2);
            this.ctx.lineTo(x, this.height / 2);
            this.ctx.lineWidth = CELL_STROKE;
            this.ctx.stroke();
            this.ctx.closePath();
        }

        // Right x-axis
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.width / 2, 0);
        this.ctx.lineWidth = AXIS_STROKE;
        this.ctx.stroke();
        this.ctx.closePath();

        for (let x = CELL_INTERVAL; x <= this.width / 2; x += CELL_INTERVAL) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, -this.height / 2);
            this.ctx.lineTo(x, this.height / 2);
            this.ctx.lineWidth = CELL_STROKE;
            this.ctx.stroke();
            this.ctx.closePath();
        }

        // Top y-axis
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, this.height / 2);
        this.ctx.lineWidth = AXIS_STROKE;
        this.ctx.stroke();
        this.ctx.closePath();

        for (let y = CELL_INTERVAL; y <= this.height / 2; y += CELL_INTERVAL) {
            this.ctx.beginPath();
            this.ctx.moveTo(-this.width / 2, y);
            this.ctx.lineTo(this.width / 2, y);
            this.ctx.lineWidth = CELL_STROKE;
            this.ctx.stroke();
            this.ctx.closePath();
        }

        // Bottom y-axis
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -this.height / 2);
        this.ctx.lineWidth = AXIS_STROKE;
        this.ctx.stroke();
        this.ctx.closePath();

        for (let y = -CELL_INTERVAL; y >= -this.height / 2; y -= CELL_INTERVAL) {
            this.ctx.beginPath();
            this.ctx.moveTo(-this.width / 2, y);
            this.ctx.lineTo(this.width / 2, y);
            this.ctx.lineWidth = CELL_STROKE;
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

    drawScene () {
        this.toCenterCoords();

        // this.drawAxis();

        // let freq = 0.01;
        // let amp = 200;
        // drawSineWave(amp, freq);

        // drawCircle(0, 0, particles[0].r);
        // drawParticleOnOrbit(0, particles[0].r);
        // drawParticleOnOrbit(90, particles[0].r);
        // drawParticleOnOrbit(180, particles[0].r);
        // drawParticleOnOrbit(270, particles[0].r);

        // for (let y = 0; y < 2000; y += 5) {
        //     drawParabola(0, y, 0.005);
        // }

        for (let object of this.objectsToDraw) {
            object.draw(this.ctx);
        }

        this.toPrevCoords();
    }

}
class Particle {

    constructor (options) {
        Object.assign(this, options);

        /**
         * @name angDeg
         * @type {number}
         * @memberOf Particle#
         */

        /**
         * @name x
         * @type {number}
         * @memberOf Particle#
         */

        /**
         * @name y
         * @type {number}
         * @memberOf Particle#
         */

        /**
         * @name r
         * @type {number}
         * @memberOf Particle#
         */

        /**
         * @name size
         * @type {number}
         * @memberOf Particle#
         */
    }

    draw (ctx) {
        if (this.angDeg && this.r) {
            this.drawInPolar(ctx);
        } else if (this.x && this.y) {
            this.drawInCartesian(ctx);
        } else {
            throw new Error('There is no valid coordinates');
        }
    }

    drawInPolar (ctx) {
        const angRad = this.angDeg / 180 * Math.PI;
        const x = this.r * Math.cos(angRad);
        const y = this.r * Math.sin(angRad);
        this.drawCircle(ctx, x, y, this.size);
    }

    drawInCartesian (ctx) {
        this.drawCircle(ctx, this.x, this.y, this.size);
    }

    drawCircle (ctx, x, y, size) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }

}
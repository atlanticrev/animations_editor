class Renderer {

    constructor (canvas) {

        /**
         * @type {HTMLCanvasElement}
         */
        this.canvas = canvas;

        /**
         * @type {CanvasRenderingContext2D|WebGL2RenderingContext}
         */
        this.ctx = canvas.ctx;

        /**
         * @type {number|null}
         * @private
         */
        this._requestFrameID = null;

        /**
         * @type {boolean}
         * @private
         */
        this._isPlaying = false;

        this._render = this._render.bind(this);

    }

    /**
     * @return void
     * @public
     */
    startRender () {
        if (!this._isPlaying) {
            this._isPlaying = true;
            this._render();
        }
    }

    /**
     * @return void
     * @public
     */
    stopRender () {
        this._isPlaying = false;
        cancelAnimationFrame(this._requestFrameID);
    }

    /**
     * @return void
     * @private
     */
    _render () {
        this.clearCanvas();
        this.canvas.drawScene();
        this.canvas.recalculateScene();
        this._requestFrameID = requestAnimationFrame(this._render);
    }

    /**
     * @return void
     * @public
     */
    clearCanvas () {
        this.canvas.clearScene();
    }

}
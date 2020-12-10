class WebGL {

    static get defaults () {
        return {
            width: 800,
            height: 600
        };
    }

    static get vertexShader () {
        return `
            attribute vec2 a_position;
            
            uniform vec2 u_resolution;
            
            void main() {
                // convert the position from pixels to 0.0 to 1.0
                vec2 zeroToOne = a_position / u_resolution;
                
                // convert from 0->1 to 0->2
                vec2 zeroToTwo = zeroToOne * 2.0;
                
                // convert from 0->2 to -1->+1 (clip space)
                vec2 clipSpace = zeroToTwo - 1.0;
                
                gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
            }
        `.trim();
    }

    static get fragmentShader () {
        return `
            // fragment shaders don't have a default precision so we need
            // to pick one. mediump is a good default. It means "medium precision"
            precision mediump float;
            
            void main() {
                // gl_FragColor is a special variable a fragment shader
                // is responsible for setting
                gl_FragColor = vec4(1, 0, 0.5, 1); // return reddish-purple
            }
        `.trim();
    }

    constructor (el = document.querySelector('canvas'), options = {}) {
        if (!el) {
            throw new Error('There is no HTMLCanvasElement');
        }

        Object.assign(this, Canvas.defaults, options);

        /**
         * @name width
         * @type {number}
         * @memberOf WebGL#
         */

        /**
         * @name height
         * @type {number}
         * @memberOf WebGL#
         */

        /**
         * @name objectsToDraw
         * @type {Object}
         * @memberOf WebGL#
         */

        /**
         * @type {WebGLRenderingContext}
         */
        this.gl = el.getContext('webgl');

        /**
         * @type {WebGLProgram | undefined}
         */
        this.shaderProgram = this.createShaderProgram();
        this.initShaderProgram();

        el.width = this.width;
        el.height = this.height;

        el.style.setProperty('--width', `${this.width}px`);
        el.style.setProperty('--height', `${this.height}px`);

        // el.addEventListener('resize', this.onResize);
    }

    onResize () {}

    clearScene () {}

    recalculateScene () {
        // @todo Move to separate Animation object?
        // New positions evaluation
        // for (let object of this.objectsToDraw) {
        //     object.angVel += object.angAccel;
        //     object.angDeg = (object.angDeg + object.angVel) % 360;
        // }
    }

    drawAxis () {
        const CELL_STROKE = 0.15;
        const AXIS_STROKE = 0.25;
        const CELL_INTERVAL = 38;
    }

    drawScene () {
        // for (let object of this.objectsToDraw) {
        //     object.draw(this.gl);
        // }

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        // Clear the canvas
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.useProgram(this.shaderProgram);

        // Set the resolution
        this.gl.uniform2f(this.resolutionUniformLocation, this.gl.canvas.width, this.gl.canvas.height);

        // Activate the a_position attribute
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

        const size = 2;
        const type = this.gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        // It binds current ARRAY_BUFFER to the attribute (a_position)
        this.gl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, offset);

        const primitiveType = this.gl.TRIANGLES;
        const buffOffset = 0;
        const count = 3;
        this.gl.drawArrays(primitiveType, buffOffset, count);
    }

    createShader (type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.log(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
    }

    createShaderProgram () {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, this.createShader(this.gl.VERTEX_SHADER, WebGL.vertexShader));
        this.gl.attachShader(program, this.createShader(this.gl.FRAGMENT_SHADER, WebGL.fragmentShader));
        this.gl.linkProgram(program);
        const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (success) {
            return program;
        }
        console.log(this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
    }

    initShaderProgram () {
        // @todo Move to the this.attributes?
        this.positionAttributeLocation = this.gl.getAttribLocation(this.shaderProgram, "a_position");

        // @todo Move to the this.uniforms?
        this.resolutionUniformLocation = this.gl.getUniformLocation(this.shaderProgram, "u_resolution");

        // @todo Move to the this.buffers?
        this.positionBuffer = this.gl.createBuffer();
        // ARRAY_BUFFER - global bind point, we bind positionBuffer to it
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

        const positions = [
            50, 50,
            200, 50,
            200, 200
        ];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
    }

}
const canvasEl = document.querySelector('canvas');

const sceneConfig = {};

const canvas = new Canvas(canvasEl, {
    width: window.innerWidth,
    height: window.innerHeight,
    objectsToDraw: sceneConfig
});

// const canvas = new WebGL(canvasEl, {
//     width: window.innerWidth,
//     height: window.innerHeight,
//     objectsToDraw: sceneConfig
// });

const renderer = new Renderer(canvas);
renderer.startRender();
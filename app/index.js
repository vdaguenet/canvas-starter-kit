import Scene from './Scene';
import raf from 'raf';
import dat from 'dat-gui';

const canvas = document.getElementById('c');
const scene = new Scene(canvas, window.innerWidth, window.innerHeight);

// GUI settings
const gui = new dat.GUI();
gui.add(scene.params, 'animate');

// handle resize
window.addEventListener('resize', resizeHandler);

// let's play !
animate();

function resizeHandler() {
  scene.resize(window.innerWidth, window.innerHeight);
}

function animate() {
  raf(animate);

  scene.render();
}

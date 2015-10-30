import Particle from '../lib/Particle';
import { clamp } from '../lib/math';

export default class ParticleContainer {
  constructor(nbParticle, width, height) {
    this.width = width;
    this.height = height;
    this.nbParticle = nbParticle;
    this.pool = [];

    this.populate();
  }

  populate() {
    let p;
    let x;
    let y;
    let angle = 0;
    const slice = 2 * Math.PI / this.nbParticle;

    for (let i = 0; i < this.nbParticle; i++) {
      angle = slice * i;
      x = 0.5 * this.width + Math.cos(angle) * 150;
      y = 0.5 * this.height + Math.sin(angle) * 150;

      p = new Particle(x, y);
      this.pool.push(p);
    }
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  update(context, tick, animate) {
    this.pool.forEach((particle, i) => {
      if (animate) {
        particle.scale = Math.abs(Math.sin(tick + i / this.nbParticle));
        particle.update();
      }
      particle.draw(context);
    });
  }
}
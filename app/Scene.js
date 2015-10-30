import ParticleContainer from './objects/ParticleContainer';

export default class Scene {
  constructor($canvas, width, height) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');

    this.width = 0;
    this.height = 0;

    this.params = {
      animate: true,
    };
    this.tick = 0;

    this.particleContainer = new ParticleContainer(40, width, height);

    this.resize(width, height);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.particleContainer.resize(width, height);
    this.$canvas.width = width;
    this.$canvas.height = height;
  }

  render() {
    if (this.params.animate) {
      this.tick += 0.02;
    }

    this.context.clearRect(0, 0, this.width, this.height);

    this.particleContainer.update(this.context, this.tick, this.params.animate);
  }
}
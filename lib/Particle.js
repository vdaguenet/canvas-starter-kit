import {distance} from './math'

export default class Particle {
  constructor (x, y, speed, direction, grav = 0) {
    // Position
    this.x = x
    this.y = y
    // Velocity
    this.vx = Math.cos(direction) * speed
    this.vy = Math.sin(direction) * speed
    // Physics params
    this.mass = 1
    this.bounce = -1
    this.friction = 1
    this.gravity = grav
    this.springs = []
    this.gravitations = []

    this.radius = 5
  }

  getSpeed () {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy)
  }

  setSpeed (speed) {
    var heading = this.getHeading()
    this.vx = Math.cos(heading) * speed
    this.vy = Math.sin(heading) * speed
  }

  getHeading () {
    return Math.atan2(this.vy, this.vx)
  }

  setHeading (heading) {
    let speed = this.getSpeed()
    this.vx = Math.cos(heading) * speed
    this.vy = Math.sin(heading) * speed
  }

  accelerate (ax, ay) {
    this.vx += ax
    this.vy += ay
  }

  update () {
    this.handleGravitations()
    this.handleSprings()

    this.vx *= this.friction
    this.vy *= this.friction

    this.vy += this.gravity

    this.x += this.vx
    this.y += this.vy
  }

  angleTo (p) {
    return Math.atan2(p.y - this.y, p.x - this.x)
  }

  distanceTo (p) {
    return distance(p.x, p.y, this.x, this.y)
  }

  addGravitation (p) {
    this.removeGravitation(p)
    this.gravitations.push(p)
  }

  removeGravitation (p) {
    for (let i = 0, l = this.gravitations.length; i < l; i++) {
      if (p === this.gravitations[i]) {
        this.gravitations.slice(i, 1)
        return
      }
    }
  }

  gravitateTo (p) {
    let dx = p.x - this.x
    let dy = p.y - this.y
    let distSQ = dx * dx + dy * dy
    let dist = Math.sqrt(distSQ)

    let force = p.mass / distSQ
    let ax = dx / dist * force
    let ay = dy / dist * force

    this.vx += ax
    this.vy += ay
  }

  handleGravitations () {
    this.gravitations.forEach((point) => {
      this.gravitateTo(point)
    })
  }

  addSpring (point, k, length = 0) {
    this.removeSpring(point)
    this.springs.push({point, k, length})
  }

  removeSpring (point) {
    for (let i = 0, l = this.springs.length; i < l; i++) {
      if (point === this.springs[i]) {
        this.springs.slice(i, 1)
        return
      }
    }
  }

  springTo (point, k, length = 0) {
    let dx = point.x - this.x
    let dy = point.y - this.y
    let distance = Math.sqrt(dx * dx + dy * dy)
    let force = (distance - length) * k
    let ax = dx / distance * force
    let ay = dy / distance * force

    this.vx += ax
    this.vy += ay
  }

  handleSprings () {
    this.springs.forEach((spring) => {
      this.springTo(spring.point, spring.k, spring.length)
    })
  }
}

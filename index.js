import loop from 'raf-loop'
import createCtx from '2d-context'
import Particle from './lib/Particle'
import {randomRange} from './lib/math'

const engine = loop(update)
const ctx = createCtx()
const canvas = ctx.canvas
let mouse = {x: 0, y: 0}

document.body.appendChild(canvas)
window.addEventListener('resize', resize)
resize()
window.addEventListener('mousemove', onMouseMouve)

let w = canvas.width
let h = canvas.height

let pA = new Particle(
  randomRange(0, w),
  randomRange(0, h),
  0,
  0,
  0.3
)
pA.radius = 20
pA.friction = 0.9

let planet = new Particle(
  randomRange(0, w),
  randomRange(0, h),
  0,
  0
)
planet.radius = 5

pA.addSpring(planet, 0.1, 100)

engine.start()

function resize () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  w = canvas.width
  h = canvas.height
}

function onMouseMouve (evt) {
  mouse.x = evt.clientX
  mouse.y = evt.clientY
}

function update () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  pA.update()
  // planet.update()

  ctx.beginPath()
  ctx.arc(pA.x, pA.y, pA.radius, 0, 2 * Math.PI, false)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(planet.x, planet.y, planet.radius, 0, 2 * Math.PI, false)
  ctx.fill()
}

function handleEdges (obj) {
  if (obj.x < -obj.radius) {
    obj.x = canvas.width + obj.radius
  }

  if (obj.x > canvas.width + obj.radius) {
    obj.x = -obj.radius
  }

  if (obj.y < -obj.radius) {
    obj.y = canvas.height + obj.radius
  }

  if (obj.y > canvas.height + obj.radius) {
    obj.y = -obj.radius
  }
}

function handleEdgesWithBounce (obj) {
  if (obj.x + obj.radius > canvas.width) {
    obj.x = canvas.width - obj.radius
    obj.vx *= obj.bounce
  }

  if (obj.x - obj.radius < 0) {
    obj.x = obj.radius
    obj.vx *= obj.bounce
  }

  if (obj.y + obj.radius > canvas.height) {
    obj.y = canvas.height - obj.radius
    obj.vy *= obj.bounce
  }

  if (obj.y - obj.radius < 0) {
    obj.y = obj.radius
    obj.vy *= obj.bounce
  }
}


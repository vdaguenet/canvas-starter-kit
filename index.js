import loop from 'raf-loop'
import createCtx from '2d-context'

const engine = loop(update)
const ctx = createCtx()
const canvas = ctx.canvas

document.body.appendChild(canvas)
window.addEventListener('resize', resize)

resize()
engine.start()

function resize () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

function update () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

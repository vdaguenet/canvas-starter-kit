export function normalize (value, min, max) {
  return (value - min) / (max - min)
}

export function lerp (norm, min, max) {
  return (max - min) * norm + min
}

export function map (value, sourceMin, sourceMax, destMin, destMax) {
  return lerp(normalize(value, sourceMin, sourceMax), destMin, destMax)
}

export function clamp (value, min, max) {
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max))
}

export function distance (x0, y0, x1, y1) {
  const dx = x1 - x0
  const dy = y1 - y0

  return Math.sqrt(dx * dx + dy * dy)
}

export function inRange (value, min, max) {
  return value >= Math.min(min, max) && value <= Math.max(min, max)
}

export function rangeIntersect (min0, max0, min1, max1) {
  return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1)
}

export function degreesToRads (degrees) {
  return degrees / 180 * Math.PI
}

export function radsToDegrees (radians) {
  return radians * 180 / Math.PI
}

export function randomRange (min, max) {
  return min + Math.random() * (max - min)
}

export function circleCollision (c1, c2) {
  let d = distance(c1.x, c1.y, c2.x, c2.y)
  let rSum = c1.radius + c2.radius

  return d <= rSum
}

export function rectCollision (r1, r2) {
  return rangeIntersect(r1.x, r1.x + r1.width, r2.x, r2.x + r2.width) && rangeIntersect(r1.y, r1.y + r1.height, r2.y, r2.y + r2.height)
}

export function pointInCircle (x, y, c) {
  return distance(x, y, c.x, c.y) <= c.radius
}

export function pointInRect (x, y, rect) {
  return inRange(x, rect.x, rect.x + rect.width) && inRange(y, rect.y, rect.y + rect.height)
}

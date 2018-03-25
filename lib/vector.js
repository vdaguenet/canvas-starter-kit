const vector = {
  _x: 1,
  _y: 0,

  create (x = 0, y = 0) {
    let v = Object.create(this)
    v.x = x
    v.y = y

    return v
  },

  set x (x) {
    this._x = x
  },

  set y (y) {
    this._y = y
  },

  get x () {
    return this._x
  },

  get y () {
    return this._y
  },

  setAngle (angle) {
    var length = this.getLength()
    this._x = Math.cos(angle) * length
    this._y = Math.sin(angle) * length
  },

  getAngle () {
    return Math.atan2(this._y, this._x) // atan(y/x)
  },

  setLength (length) {
    var angle = this.getAngle()
    this._x = Math.cos(angle) * length
    this._y = Math.sin(angle) * length
  },

  getLength () {
    return Math.hypot(this._x, this._y)
  },

  add (v2) {
    return vector.create(this._x + v2.x, this._y + v2.y)
  },

  subtract (v2) {
    return vector.create(this._x - v2.x, this._y - v2.y)
  },

  multiply (val) {
    return vector.create(this._x * val, this._y * val)
  },

  divide (val) {
    return vector.create(this._x / val, this._y / val)
  },

  addTo (v2) {
    this._x += v2.x
    this._y += v2.y
  },

  subtractFrom (v2) {
    this._x -= v2.x
    this._y -= v2.y
  },

  multiplyBy (val) {
    this._x *= val
    this._y *= val
  },

  divideBy (val) {
    this._x /= val
    this._y /= val
  }
}

export default vector

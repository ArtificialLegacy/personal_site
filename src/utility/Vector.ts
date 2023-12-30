class Vector {
  public x: number
  public y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  from() {
    return new Vector(this.x, this.y)
  }

  distance(vec: Vector) {
    return Math.hypot(vec.x - this.x, vec.y - this.y)
  }

  add(vec: Vector) {
    this.x += vec.x
    this.y += vec.y

    return this
  }

  sub(vec: Vector) {
    this.x -= vec.x
    this.y -= vec.y

    return this
  }

  mul(vec: Vector) {
    this.x *= vec.x
    this.y *= vec.y

    return this
  }

  mulBy(factor: number) {
    this.x *= factor
    this.y *= factor

    return this
  }

  divBy(divisor: number) {
    this.x /= divisor
    this.y /= divisor

    return this
  }

  static zero() {
    return new Vector()
  }

  static random(max: number, min: number) {
    return new Vector(max * Math.random(), min * Math.random())
  }

  static x(x: number) {
    return new Vector(x, 0)
  }

  static y(y: number) {
    return new Vector(0, y)
  }
}

export default Vector

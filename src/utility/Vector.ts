/**
 * A class representing a 2D vector.
 */
class Vector {
  public x: number
  public y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  /**
   * Creates a new vector using this vector's x and y values.
   * @returns - A new vector.
   */
  from() {
    return new Vector(this.x, this.y)
  }

  /**
   * Calculates the distance between this vector and another vector.
   * @param vec - The other vector to calculate the distance to.
   * @returns - The distance between the two vectors.
   */
  distance(vec: Vector) {
    return Math.hypot(vec.x - this.x, vec.y - this.y)
  }

  /**
   * Adds a vector to this vector.
   * @param vec - The vector to add.
   * @returns - This vector.
   */
  add(vec: Vector) {
    this.x += vec.x
    this.y += vec.y

    return this
  }

  /**
   * Subtracts a vector from this vector.
   * @param vec - The vector to subtract.
   * @returns - This vector.
   */
  sub(vec: Vector) {
    this.x -= vec.x
    this.y -= vec.y

    return this
  }

  /**
   * Multiplies this vector by another vector.
   * @param vec - The vector to multiply by.
   * @returns - This vector.
   */
  mul(vec: Vector) {
    this.x *= vec.x
    this.y *= vec.y

    return this
  }

  /**
   * Multiplies both x and y by the same factor.
   * @param factor - The factor to multiply by.
   * @returns - This vector.
   */
  mulBy(factor: number) {
    this.x *= factor
    this.y *= factor

    return this
  }

  /**
   * Divides both x and y by the same divisor.
   * @param divisor - The divisor to divide by.
   * @returns - This vector.
   */
  divBy(divisor: number) {
    this.x /= divisor
    this.y /= divisor

    return this
  }

  /**
   * Creates a new vector with zero x and y values.
   * @returns - A new vector.
   */
  static get Zero() {
    return new Vector()
  }

  /**
   * Creates a new vector with random x and y values between 0 and the given max values.
   * @param xmax - The maximum x value.
   * @param ymax - The maximum y value.
   * @returns - A new vector.
   */
  static random(xmax: number, ymax: number) {
    return new Vector(xmax * Math.random(), ymax * Math.random())
  }

  /**
   * Creates a new vector with the given x value and a zero y value.
   * @param x - The x value.
   * @returns - A new vector.
   */
  static x(x: number) {
    return new Vector(x, 0)
  }

  /**
   * Creates a new vector with the given y value and a zero x value.
   * @param y - The y value.
   * @returns - A new vector.
   */
  static y(y: number) {
    return new Vector(0, y)
  }
}

export default Vector

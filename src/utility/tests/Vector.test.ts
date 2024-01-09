import Vector from '../Vector'

describe('Vector instance', () => {
  const vec = new Vector(1, 2)

  it('should create a vector', () => {
    expect(vec).toEqual({ x: 1, y: 2 })
  })

  it('should get a new vector from', () => {
    expect(vec.from()).toEqual(vec)
  })

  it('should get the distance between two vectors', () => {
    expect(vec.distance(new Vector(1, 4))).toBe(2)
  })

  it('should add a vector', () => {
    expect(vec.add(new Vector(2, 3))).toEqual(new Vector(3, 5))
  })

  it('should subtract a vector', () => {
    expect(vec.sub(new Vector(2, 3))).toEqual(new Vector(1, 2))
  })

  it('should multiply a vector', () => {
    expect(vec.mul(new Vector(2, 3))).toEqual(new Vector(2, 6))
  })

  it('should multiply by a factor', () => {
    expect(vec.mulBy(2)).toEqual(new Vector(4, 12))
  })

  it('should divide by a factor', () => {
    expect(vec.divBy(2)).toEqual(new Vector(2, 6))
  })
})

describe('Vector static', () => {
  it('should get a zero vector', () => {
    expect(Vector.Zero).toEqual(new Vector(0, 0))
  })

  it('should get a random vector', () => {
    const vec = Vector.random(1, 2)

    expect(vec.x).toBeGreaterThanOrEqual(0)
    expect(vec.x).toBeLessThanOrEqual(1)
    expect(vec.y).toBeGreaterThanOrEqual(0)
    expect(vec.y).toBeLessThanOrEqual(2)
  })

  it('should get a vector with just an x value', () => {
    expect(Vector.x(1)).toEqual(new Vector(1, 0))
  })

  it('should get a vector with just a y value', () => {
    expect(Vector.y(1)).toEqual(new Vector(0, 1))
  })
})

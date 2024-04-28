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
        expect(vec.from().add(new Vector(2, 3))).toEqual(new Vector(3, 5))
    })

    it('should add a factor', () => {
        expect(vec.from().addBy(2)).toEqual(new Vector(3, 4))
    })

    it('should subtract a vector', () => {
        expect(vec.from().sub(new Vector(2, 3))).toEqual(new Vector(-1, -1))
    })

    it('should subtract a factor', () => {
        expect(vec.from().subBy(2)).toEqual(new Vector(-1, 0))
    })

    it('should multiply a vector', () => {
        expect(vec.from().mul(new Vector(2, 3))).toEqual(new Vector(2, 6))
    })

    it('should multiply by a factor', () => {
        expect(vec.from().mulBy(2)).toEqual(new Vector(2, 4))
    })

    it('should divide by a vector', () => {
        expect(vec.from().div(new Vector(2, 4))).toEqual(new Vector(0.5, 0.5))
    })

    it('should divide by a factor', () => {
        expect(vec.from().divBy(2)).toEqual(new Vector(0.5, 1))
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

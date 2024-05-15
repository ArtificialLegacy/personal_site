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

    direction(vec: Vector) {
        return Math.atan2(vec.y - this.y, vec.x - this.x)
    }

    compare(vec: Vector): boolean {
        return this.x === vec.x && this.y === vec.y
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
     * Adds a factor to both x and y.
     * @param factor - The factor to add.
     * @returns - This vector.
     */
    addBy(factor: number) {
        this.x += factor
        this.y += factor

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
     * Subtracts a factor from both x and y.
     * @param factor - The factor to subtract.
     * @returns - This vector.
     */
    subBy(factor: number) {
        this.x -= factor
        this.y -= factor

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
     * Divides this vector by another vector.
     * @param vec - The vector to divide by.
     * @returns - This vector.
     */
    div(vec: Vector) {
        this.x /= vec.x
        this.y /= vec.y

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

/**
 * A class representing a 3D vector.
 */
class Vector3 {
    public x: number
    public y: number
    public z: number

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    /**
     * Creates a new vector using this vector's x, y and z values.
     * @returns - A new vector.
     */
    from() {
        return new Vector3(this.x, this.y, this.z)
    }

    to2(): Vector {
        return new Vector(this.x, this.y)
    }

    /**
     * Adds a vector to this vector.
     * @param vec - The vector to add.
     * @returns - This vector.
     */
    add(vec: Vector3) {
        this.x += vec.x
        this.y += vec.y
        this.z += vec.z

        return this
    }

    /**
     * Adds a factor to x, y and z.
     * @param factor - The factor to add.
     * @returns - This vector.
     */
    addBy(factor: number) {
        this.x += factor
        this.y += factor
        this.z += factor

        return this
    }

    /**
     * Subtracts a vector from this vector.
     * @param vec - The vector to subtract.
     * @returns - This vector.
     */
    sub(vec: Vector3) {
        this.x -= vec.x
        this.y -= vec.y
        this.z -= vec.z

        return this
    }

    /**
     * Subtracts a factor from x, y and z.
     * @param factor - The factor to subtract.
     * @returns - This vector.
     */
    subBy(factor: number) {
        this.x -= factor
        this.y -= factor
        this.z -= factor

        return this
    }

    /**
     * Multiplies this vector by another vector.
     * @param vec - The vector to multiply by.
     * @returns - This vector.
     */
    mul(vec: Vector3) {
        this.x *= vec.x
        this.y *= vec.y
        this.z *= vec.z

        return this
    }

    /**
     * Multiplies x, y and z by the same factor.
     * @param factor - The factor to multiply by.
     * @returns - This vector.
     */
    mulBy(factor: number) {
        this.x *= factor
        this.y *= factor
        this.z *= factor

        return this
    }

    /**
     * Divides this vector by another vector.
     * @param vec - The vector to divide by.
     * @returns - This vector.
     */
    div(vec: Vector3) {
        this.x /= vec.x
        this.y /= vec.y
        this.z /= vec.z

        return this
    }

    /**
     * Divides x, y and z by the same divisor.
     * @param divisor - The divisor to divide by.
     * @returns - This vector.
     */
    divBy(divisor: number) {
        this.x /= divisor
        this.y /= divisor
        this.z /= divisor

        return this
    }

    /**
     *
     * @param projection
     */
    project(perspective: number, size: Vector): Vector {
        const proj = new Vector()

        const scale = perspective / (perspective + this.z)

        proj.x = this.x * scale + size.x / 2
        proj.y = this.y * scale + size.y / 2

        return proj
    }

    rotate(matrix: number[]) {
        const x = this.x * matrix[0] + this.y * matrix[1] + this.z * matrix[2]
        const y = this.x * matrix[3] + this.y * matrix[4] + this.z * matrix[5]
        const z = this.x * matrix[6] + this.y * matrix[7] + this.z * matrix[8]

        this.x = x
        this.y = y
        this.z = z

        return this
    }

    rotateRelative(origin: Vector3, matrix: number[]) {
        this.sub(origin).rotate(matrix).add(origin)

        return this
    }

    /**
     * Creates a new vector with zero x and y values.
     * @returns - A new vector.
     */
    static get Zero() {
        return new Vector3()
    }

    /**
     * Creates a new vector with the given x value.
     * @param x - The x value.
     * @returns - A new vector.
     */
    static x(x: number) {
        return new Vector3(x, 0, 0)
    }

    /**
     * Creates a new vector with the given y value.
     * @param y - The y value.
     * @returns - A new vector.
     */
    static y(y: number) {
        return new Vector3(0, y, 0)
    }

    /**
     * Creates a new vector with the given z value.
     * @param z - The z value.
     * @returns - A new vector.
     */
    static z(z: number): Vector3 {
        return new Vector3(0, 0, z)
    }
}

export { Vector, Vector3 }

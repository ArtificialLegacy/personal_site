import Vector from 'utility/Vector'
import degtorad from 'utility/degtorad'

// drawing constants
const SCALE = 12
const SIDE = 1.12
const MID = 0.75
const SIDE_ANGLE = 45
const SIDE_ANGLE_OFFSET = (360 - SIDE_ANGLE) / 2

const COLORS = [
  '#ffadad', // red
  '#ffd6a5', // orange
  '#fdffb6', // yellow
  '#caffbf', // green
  '#9bf6ff', // cyan
  '#a0c4ff', // blue
  '#bdb2ff', // purple
  '#ffc6ff', // pink
  '#fffffc', // white
]

// simulation constants
const PERCEPTION_DISTANCE = 40
const PROTECTED_RANGE = 8
const AVOID_FACTOR = 0.05
const MATCHING_FACTOR = 0.05
const CENTERING_FACTOR = 0.0005
const MARGIN = 16
const TURN_FACTOR = 0.4
const MAX_SPEED = 4
const MIN_SPEED = 2
const MAX_BIAS = 0.01
const BIAS_INCREMENT = 0.00004
const FLEE_RANGE = 128
const FLEE_FACTOR = 0.2

/**
 * Class representing a single boid instance.
 *
 * @property id - The unique id of the boid.
 * @property pos - The position of the boid as a vector.
 * @property dir - The direction of the boid in degrees.
 *
 * @property vel - The velocity of the boid as a vector.
 * @property group - The scout group of the boid, this is used for determining direction of bias.
 * @property bias - The current bias of the boid.
 * @property species - The species of the boid, this is used for determining which boids to interact with.
 */
class Boid {
  public id: number
  public pos: Vector
  public dir: number

  private vel: Vector
  private group: number
  private bias: number
  private species: number

  constructor(id: number, pos: Vector, dir: number, group: number, species: number) {
    this.id = id
    this.pos = pos
    this.dir = dir
    this.group = group
    this.species = species

    this.vel = Vector.Zero
    this.bias = 0
  }

  /**
   * Draws the boid to the canvas rendering context.
   * @param ctx - The canvas rendering context to draw to.
   */
  public draw(ctx: CanvasRenderingContext2D) {
    const side = SIDE * SCALE
    const mid = MID * SCALE

    const leftrad = degtorad(this.dir + SIDE_ANGLE_OFFSET + SIDE_ANGLE)
    const rightrad = degtorad(this.dir + SIDE_ANGLE_OFFSET)
    const midrad = degtorad(this.dir + 180)

    ctx.fillStyle = COLORS[this.species]
    ctx.beginPath()
    ctx.moveTo(this.pos.x, this.pos.y) //  b
    ctx.lineTo(this.pos.x + side * Math.cos(leftrad), this.pos.y + side * Math.sin(leftrad)) // left tail tip
    ctx.lineTo(this.pos.x + mid * Math.cos(midrad), this.pos.y + mid * Math.sin(midrad)) // convex tail
    ctx.lineTo(this.pos.x + side * Math.cos(rightrad), this.pos.y + side * Math.sin(rightrad)) // right tail tip
    ctx.lineTo(this.pos.x, this.pos.y) // back to head
    ctx.fill()
  }

  /**
   * Updates the boid's position and direction based on the other boids in the simulation.
   * @param boids - The list of all boids in the simulation.
   * @param bounds - The bounds of the canvas.
   * @param mouse - The current mouse position to use for mouse avoidance.
   */
  public update(boids: Boid[], bounds: Vector, mouse: Vector) {
    const avgVel = Vector.Zero
    const avgPos = Vector.Zero
    const closeD = Vector.Zero
    let boidCount = 0

    for (let i = 0; i < boids.length; i++) {
      const boid = boids[i]

      // filter boids
      if (boid.species !== this.species) continue
      if (boid.id === this.id) continue

      // seperation
      if (boid.pos.distance(this.pos) <= PROTECTED_RANGE) {
        closeD.add(this.pos.from().sub(boid.pos))
      } else if (boid.pos.distance(this.pos) <= PERCEPTION_DISTANCE) {
        boidCount++
        // alignment
        avgVel.add(boid.vel)
        // cohesion
        avgPos.add(boid.pos)
      }
    }

    // alignment * cohesion
    if (boidCount > 0) {
      // alignment
      avgVel.divBy(boidCount)
      // cohesion
      avgPos.divBy(boidCount)
    }

    // alignment
    this.vel.add(avgVel.sub(this.vel).mulBy(MATCHING_FACTOR))
    // cohesion
    this.vel.add(avgPos.sub(this.pos).mulBy(CENTERING_FACTOR))

    // seperation
    this.vel.add(closeD.mulBy(AVOID_FACTOR))

    // mouse avoidance
    if (mouse.distance(this.pos) <= FLEE_RANGE) {
      this.vel.add(this.pos.from().sub(mouse).mulBy(FLEE_FACTOR))
    }

    // canvas edge margin
    if (this.pos.x < 0 + MARGIN) this.vel.add(Vector.x(TURN_FACTOR))
    if (this.pos.x > bounds.x - MARGIN) this.vel.sub(Vector.x(TURN_FACTOR))
    if (this.pos.y < 0 + MARGIN) this.vel.add(Vector.y(TURN_FACTOR))
    if (this.pos.y > bounds.y - MARGIN) this.vel.sub(Vector.y(TURN_FACTOR))

    // group bias
    if (this.group === 0) {
      if (this.vel.x > 0) this.bias = Math.min(MAX_BIAS, this.bias + BIAS_INCREMENT)
      else this.bias = Math.max(BIAS_INCREMENT, this.bias - BIAS_INCREMENT)

      this.vel.x = (1 - this.bias) * this.vel.x + this.bias * 1
    }

    if (this.group === 1) {
      if (this.vel.x < 0) this.bias = Math.min(MAX_BIAS, this.bias + BIAS_INCREMENT)
      else this.bias = Math.max(BIAS_INCREMENT, this.bias - BIAS_INCREMENT)

      this.vel.x = (1 - this.bias) * this.vel.x + this.bias * -1
    }

    // speed limits
    const speed = Math.hypot(this.vel.x, this.vel.y)

    if (speed > MAX_SPEED) {
      this.vel.divBy(speed).mulBy(MAX_SPEED)
    }

    if (speed < MIN_SPEED) {
      this.vel.divBy(speed).mulBy(MIN_SPEED)
    }

    // update pos and direction
    this.dir = Math.atan2(this.vel.y, this.vel.x) * (180 / Math.PI)
    this.pos.add(this.vel)
  }
}

export default Boid

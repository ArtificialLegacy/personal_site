/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanvasProps } from 'modules/canvas'
import { Vector, Vector3 } from 'utility/Vector'

const PERSPECTIVE = 500
const CAMERA_ANGLE = Math.PI * 0.2

function matrix_x(radians: number) {
    return [1, 0, 0, 0, Math.cos(radians), -Math.sin(radians), 0, Math.sin(radians), Math.cos(radians)]
}

function matrix_y(radians: number) {
    return [Math.cos(radians), 0, Math.sin(radians), 0, 1, 0, -Math.sin(radians), 0, Math.cos(radians)]
}

function matrix_z(radians: number) {
    return [Math.cos(radians), -Math.sin(radians), 0, Math.sin(radians), Math.cos(radians), 0, 0, 0, 1]
}

const BODY_COLOR = '#FFFFFF'
const BODY_LENGTH = 150
const BODY_HEIGHT = 30
const BODY_DEPTH = 70
const BODY_LENGTH_HALF = 75
const BODY_DEPTH_HALF = 35

const THIGH_COLOR = '#FF0000'
const THIGH_LENGTH = 15
const THIGH_HEIGHT = 45
const THIGH_DEPTH = 15

const SHIN_COLOR = '#0000FF'
const SHIN_LENGTH = 8
const SHIN_HEIGHT = 55
const SHIN_DEPTH = 8

class FlatLine {
    public a: Vector
    public b: Vector
    public depth: number
    private color: string

    constructor(a: Vector, b: Vector, depth: number, color: string) {
        this.a = a
        this.b = b
        this.depth = depth
        this.color = color
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.color
        ctx.beginPath()
        ctx.moveTo(this.a.x, this.a.y)
        ctx.lineTo(this.b.x, this.b.y)
        ctx.stroke()
    }
}

class Line {
    public a: Vector3
    public b: Vector3
    private color: string

    constructor(a: Vector3, b: Vector3, color: string) {
        this.a = a
        this.b = b
        this.color = color
    }

    public pool(size: Vector, rotation: number[], pool: FlatLine[]) {
        const a = this.a.from().rotate(rotation).rotate(matrix_x(CAMERA_ANGLE))
        const b = this.b.from().rotate(rotation).rotate(matrix_x(CAMERA_ANGLE))

        pool.push(new FlatLine(a.project(PERSPECTIVE, size), b.project(PERSPECTIVE, size), a.z, this.color))
    }
}

class Box {
    private body: Line[]
    private color: string

    constructor(offset: Vector3, length: number, height: number, depth: number, color: string) {
        const x = offset.x + length
        const y = offset.y + height
        const z = offset.z + depth

        this.body = [
            new Line(new Vector3(offset.x, offset.y, offset.z), new Vector3(x, offset.y, offset.z), color),
            new Line(new Vector3(x, offset.y, offset.z), new Vector3(x, y, offset.z), color),
            new Line(new Vector3(x, y, offset.z), new Vector3(offset.x, y, offset.z), color),
            new Line(new Vector3(offset.x, y, offset.z), new Vector3(offset.x, offset.y, offset.z), color),

            new Line(new Vector3(offset.x, offset.y, offset.z), new Vector3(offset.x, offset.y, z), color),
            new Line(new Vector3(x, offset.y, offset.z), new Vector3(x, offset.y, z), color),
            new Line(new Vector3(x, y, offset.z), new Vector3(x, y, z), color),
            new Line(new Vector3(offset.x, y, offset.z), new Vector3(offset.x, y, z), color),

            new Line(new Vector3(offset.x, offset.y, z), new Vector3(x, offset.y, z), color),
            new Line(new Vector3(x, offset.y, z), new Vector3(x, y, z), color),
            new Line(new Vector3(x, y, z), new Vector3(offset.x, y, z), color),
            new Line(new Vector3(offset.x, y, z), new Vector3(offset.x, offset.y, z), color),
        ]

        this.color = color
    }

    public rotate(matrix: number[]) {
        this.body.forEach((line) => {
            line.a.rotate(matrix)
            line.b.rotate(matrix)
        })
    }

    public translate(by: Vector3) {
        this.body.forEach((line) => {
            line.a.add(by)
            line.b.add(by)
        })
    }

    public draw(
        size: Vector,
        origin: Vector3 = new Vector3(0, 0, 0),
        matrix: number[],
        rotationMatrix: number[],
        pool: FlatLine[],
    ) {
        this.body.forEach((line) => {
            const newLine = new Line(line.a.from(), line.b.from(), this.color)
            newLine.a.add(origin).rotateRelative(origin, matrix)
            newLine.b.add(origin).rotateRelative(origin, matrix)

            newLine.pool(size, rotationMatrix, pool)
        })
    }
}

class Joint {
    public arm: Line
    private body: Box
    public child: Joint | null
    public angle: number
    public zeroPos: Vector
    private offset: [Vector, Vector]
    public height: number
    private base: Vector | undefined

    constructor(arm: Line, length: number, height: number, depth: number, color: string, child: Joint | null) {
        this.arm = arm

        this.body = new Box(new Vector3(-(length / 2), 0, -(depth / 2)), length, height, depth, color)
        this.child = child

        this.angle = 0
        this.zeroPos = child?.zeroPos ?? new Vector(this.arm.b.x, this.arm.b.y)

        this.offset = [this.arm.a.from().sub(this.arm.b).to2(), this.child?.offset[0] ?? new Vector()]
        if (this.child != null) {
            this.offset[0].add(this.child.offset[0])
            this.base = this.offset[0].from()
        }

        this.height = height
    }

    public draw(size: Vector, rotationMatrix: number[], pool: FlatLine[]) {
        if (this.child != null) this.child.draw(size, rotationMatrix, pool)
        //this.arm.pool(size, rotationMatrix, pool)
        this.body.draw(size, this.arm.a.from(), matrix_z(this.angle), rotationMatrix, pool)
    }

    public rotate(matrix: (angle: number) => number[], angle: number) {
        this.arm.b.rotateRelative(this.arm.a, matrix(angle))
        this.angle += angle
        if (this.child) {
            const oldA = this.child.arm.a.from()
            this.child.arm.a = this.arm.b.from()
            const dist = oldA.sub(this.child.arm.a)
            this.child.arm.b.sub(dist)
            this.child.rotate(matrix, angle)
        }
    }

    private follow(target: Vector) {
        const angle = target.direction(this.offset[0])

        this.offset[0].x = target.x + Math.cos(angle) * this.height
        this.offset[0].y = target.y + Math.sin(angle) * this.height

        this.offset[1].x = target.x
        this.offset[1].y = target.y
    }

    private calcInverseKinematics(pos: Vector): Vector {
        if (this.child != null) {
            pos = this.child.calcInverseKinematics(pos)
        }

        this.follow(pos)

        return this.offset[0].from()
    }

    private recalcPos() {
        if (this.base == null || this.child == null) return

        const angle = this.base.direction(this.offset[1])
        this.offset[0] = this.base.from()

        this.offset[1].x = this.offset[0].x + Math.cos(angle) * this.height
        this.offset[1].y = this.offset[0].y + Math.sin(angle) * this.height

        const angle2 = this.offset[1].direction(this.child.offset[1])
        this.child.offset[0] = this.offset[1].from()

        this.child.offset[1].x = this.child.offset[0].x + Math.cos(angle2) * this.child.height
        this.child.offset[1].y = this.child.offset[0].y + Math.sin(angle2) * this.child.height
    }

    private moveArms() {
        if (this.child != null) {
            this.child.moveArms()
        }

        const newBPos = this.offset[1].from().add(this.zeroPos)
        const newAPos = this.offset[0].from().add(this.zeroPos)
        const newDir = newBPos.direction(newAPos)
        const oldDir = this.arm.b.to2().direction(this.arm.a.to2())
        const rot = newDir - oldDir

        this.rotate(matrix_z, rot)
    }

    public update(pos: Vector) {
        this.calcInverseKinematics(pos)
        this.recalcPos()
        this.moveArms()
    }
}

class Doggo {
    private body: Box
    private joints: Joint[]

    constructor() {
        this.body = new Box(
            new Vector3(-(BODY_LENGTH / 2), -(BODY_HEIGHT / 2), -(BODY_DEPTH / 2)),
            BODY_LENGTH,
            BODY_HEIGHT,
            BODY_DEPTH,
            BODY_COLOR,
        )

        this.joints = [
            new Joint(
                new Line(
                    new Vector3(-BODY_LENGTH_HALF + 15, 0, BODY_DEPTH_HALF),
                    new Vector3(-BODY_LENGTH_HALF + 15, THIGH_HEIGHT, BODY_DEPTH_HALF),
                    THIGH_COLOR,
                ),
                THIGH_LENGTH,
                THIGH_HEIGHT,
                THIGH_DEPTH,
                THIGH_COLOR,
                new Joint(
                    new Line(
                        new Vector3(-BODY_LENGTH_HALF + 15, THIGH_HEIGHT, BODY_DEPTH_HALF),
                        new Vector3(-BODY_LENGTH_HALF + 15, THIGH_HEIGHT + SHIN_HEIGHT, BODY_DEPTH_HALF),
                        SHIN_COLOR,
                    ),
                    SHIN_LENGTH,
                    SHIN_HEIGHT,
                    SHIN_DEPTH,
                    SHIN_COLOR,
                    null,
                ),
            ),
            new Joint(
                new Line(
                    new Vector3(BODY_LENGTH_HALF - 15, 0, BODY_DEPTH_HALF),
                    new Vector3(BODY_LENGTH_HALF - 15, THIGH_HEIGHT, BODY_DEPTH_HALF),
                    THIGH_COLOR,
                ),
                THIGH_LENGTH,
                THIGH_HEIGHT,
                THIGH_DEPTH,
                THIGH_COLOR,
                new Joint(
                    new Line(
                        new Vector3(BODY_LENGTH_HALF - 15, THIGH_HEIGHT, BODY_DEPTH_HALF),
                        new Vector3(BODY_LENGTH_HALF - 15, THIGH_HEIGHT + SHIN_HEIGHT, BODY_DEPTH_HALF),
                        SHIN_COLOR,
                    ),
                    SHIN_LENGTH,
                    SHIN_HEIGHT,
                    SHIN_DEPTH,
                    SHIN_COLOR,
                    null,
                ),
            ),
            new Joint(
                new Line(
                    new Vector3(-BODY_LENGTH_HALF + 15, 0, -BODY_DEPTH_HALF),
                    new Vector3(-BODY_LENGTH_HALF + 15, THIGH_HEIGHT, -BODY_DEPTH_HALF),
                    THIGH_COLOR,
                ),
                THIGH_LENGTH,
                THIGH_HEIGHT,
                THIGH_DEPTH,
                THIGH_COLOR,
                new Joint(
                    new Line(
                        new Vector3(-BODY_LENGTH_HALF + 15, THIGH_HEIGHT, -BODY_DEPTH_HALF),
                        new Vector3(-BODY_LENGTH_HALF + 15, THIGH_HEIGHT + SHIN_HEIGHT, -BODY_DEPTH_HALF),
                        SHIN_COLOR,
                    ),
                    SHIN_LENGTH,
                    SHIN_HEIGHT,
                    SHIN_DEPTH,
                    SHIN_COLOR,
                    null,
                ),
            ),
            new Joint(
                new Line(
                    new Vector3(BODY_LENGTH_HALF - 15, 0, -BODY_DEPTH_HALF),
                    new Vector3(BODY_LENGTH_HALF - 15, THIGH_HEIGHT, -BODY_DEPTH_HALF),
                    THIGH_COLOR,
                ),
                THIGH_LENGTH,
                THIGH_HEIGHT,
                THIGH_DEPTH,
                THIGH_COLOR,
                new Joint(
                    new Line(
                        new Vector3(BODY_LENGTH_HALF - 15, THIGH_HEIGHT, -BODY_DEPTH_HALF),
                        new Vector3(BODY_LENGTH_HALF - 15, THIGH_HEIGHT + SHIN_HEIGHT, -BODY_DEPTH_HALF),
                        SHIN_COLOR,
                    ),
                    SHIN_LENGTH,
                    SHIN_HEIGHT,
                    SHIN_DEPTH,
                    SHIN_COLOR,
                    null,
                ),
            ),
        ]

        this.joints.forEach((joint) => {
            joint.update(new Vector(-20, -20))
        })
    }

    public draw(size: Vector, rotationMatrix: number[], pool: FlatLine[]) {
        this.joints[0].draw(size, rotationMatrix, pool)
        this.joints[1].draw(size, rotationMatrix, pool)
        this.body.draw(size, undefined, matrix_x(0), rotationMatrix, pool)
        this.joints[2].draw(size, rotationMatrix, pool)
        this.joints[3].draw(size, rotationMatrix, pool)
    }

    public update(state: IKState) {
        if (state.frame < 50) {
            state.target1.x++
        } else if (state.frame < 99) {
            state.target1.x--
            if (state.frame < 74) {
                state.target1.y--
            } else if (state.frame > 74) {
                state.target1.y++
            }
        }

        if (state.frame === 50) state.target2Active = true

        if (state.target2Active) {
            if (state.frame < 50) {
                state.target2.x--
                if (state.frame < 25) {
                    state.target2.y--
                } else if (state.frame > 25) {
                    state.target2.y++
                }
            } else if (state.frame > 50 && state.frame < 100) {
                state.target2.x++
            }
        }

        if (state.target1.x > 30) console.log(`target1 x is too large: ${state.target1.x}`)
        if (state.target1.x < -20) console.log(`target1 x is too small: ${state.target1.x}`)
        if (state.target1.y > -20) console.log(`target1 y is too large: ${state.target1.y}`)
        if (state.target1.y < -45) console.log(`target1 y is too small: ${state.target1.y}`)

        if (state.target2.x > 30) console.log(`target2 x is too large: ${state.target2.x}`)
        if (state.target2.x < -20) console.log(`target2 x is too small: ${state.target2.x}`)
        if (state.target2.y > -20) console.log(`target2 y is too large: ${state.target2.y}`)
        if (state.target2.y < -45) console.log(`target2 y is too small: ${state.target2.y}`)

        this.joints[1].update(state.target1)
        this.joints[2].update(state.target1)

        this.joints[0].update(state.target2)
        this.joints[3].update(state.target2)
    }
}

type IKState = {
    doggo: Doggo
    angle: number
    frame: number
    target1: Vector
    target2: Vector
    target2Active: boolean
}

const IKCanvas: CanvasProps<IKState> = {
    frames: 60,

    init: (_, state) => {
        state.doggo = new Doggo()
        state.angle = 0
        state.frame = 0
        state.target1 = new Vector(-20, -20)
        state.target2 = new Vector(-20, -20)
        state.target2Active = false
    },

    render: (ctx, state, size) => {
        const drawPool: FlatLine[] = []
        state.doggo.draw(size, matrix_y(-state.angle), drawPool)
        drawPool.sort((a, b) => {
            return b.depth - a.depth
        })
        drawPool.forEach((line) => line.draw(ctx))
    },
    update: (_, state) => {
        state.angle += 0.005
        if (state.angle === 1) state.angle = 0
        state.frame++
        state.doggo.update(state)
        if (state.frame === 100) state.frame = 0
    },
    scale: () => {},
    clean: () => {},
}

export { IKCanvas }

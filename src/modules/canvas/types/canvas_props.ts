import type { Vector } from 'utility/Vector'

type CanvasProps<T> = {
    init: (size: Vector, state: T) => void
    render: (ctx: CanvasRenderingContext2D, state: T, size: Vector) => void
    update: (ctx: CanvasRenderingContext2D, state: T) => void
    scale: (size: Vector, scale: Vector, state: T) => void
    frames: number
    clean: (state: T) => void
}

export type { CanvasProps }

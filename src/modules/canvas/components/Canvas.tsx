import { useRef, useEffect } from 'react'

import type { CanvasProps } from '../types/canvas_props'
import Vector from 'utility/Vector'

import '../styles/canvas.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Canvas(props: CanvasProps<any>) {
    const canvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvas.current == null) return
        const can = canvas.current
        const ctx = can.getContext('2d')
        if (ctx == null) return

        let windowSize = new Vector(document.body.clientWidth, document.getElementById('banner')?.clientHeight)
        can.width = windowSize.x
        can.height = windowSize.y

        const state = {}

        const resize = () => {
            const size = new Vector(document.body.clientWidth, document.getElementById('banner')?.clientHeight)
            const scale = size.from().div(windowSize)

            can.width = windowSize.x
            can.height = windowSize.y

            props.scale(size.from(), scale.from(), state)
            props.render(ctx, state)
            windowSize = size
        }
        window.addEventListener('resize', resize)

        props.init(windowSize, state)

        const time = setInterval(() => {
            ctx.fillStyle = '#000000'
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            props.render(ctx, state)
            props.update(ctx, state)
        }, 1000 / props.frames)

        return () => {
            clearInterval(time)
            window.removeEventListener('resize', resize)
            props.clean(state)
        }
    }, [canvas, props])

    return <canvas ref={canvas}></canvas>
}

export { Canvas }

import { useRef, useEffect, useState } from 'react'
import Boid from '../utility/Boid'
import Vector from 'utility/Vector'
import useMousePosition from 'hooks/useMousePosition'

import '../styles/boid_canvas.css'

const BOID_COUNT = 50
const SPECIES_COUNT = 9
const GROUP_RATE = 4

function BoidCanvas() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [boids, setBoids] = useState<Boid[]>([])
  const mouse = useMousePosition()
  const [canvasSize, setCanvasSize] = useState<Vector>(new Vector(document.body.clientWidth, 250))

  // init canvas and boids
  useEffect(() => {
    if (canvas.current) {
      canvas.current.width = canvasSize.x
      canvas.current.height = canvasSize.y
      setCtx(canvas.current.getContext('2d'))

      const boidArray: Boid[] = []
      for (let i = 0; i < BOID_COUNT * SPECIES_COUNT; i++) {
        boidArray.push(
          new Boid(
            i,
            Vector.random(canvasSize.x, canvasSize.y),
            360 * Math.random(),
            i % GROUP_RATE,
            i % SPECIES_COUNT,
          ),
        )
      }
      setBoids(boidArray)
    }
  }, [])

  // manage render loop
  useEffect(() => {
    let interval: number

    if (ctx) {
      interval = setInterval(() => {
        if (canvasSize.x !== ctx.canvas.width || canvasSize.y !== ctx.canvas.height) {
          ctx.canvas.width = canvasSize.x
          ctx.canvas.height = canvasSize.y
        }

        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        boids.forEach((boid) => {
          const canvasRect = ctx.canvas.getBoundingClientRect()
          boid.update(
            boids,
            new Vector(ctx.canvas.width, ctx.canvas.height),
            mouse.from().sub(new Vector(canvasRect.left, canvasRect.top)),
          )
          boid.draw(ctx)
        })
      }, 20)
    }

    return () => {
      clearInterval(interval)
    }
  }, [ctx, boids, mouse, canvasSize])

  useEffect(() => {
    let time: number | null
    setCanvasSize(new Vector(document.body.clientWidth, document.getElementById('banner')?.clientHeight))

    const handleResize = () => {
      if (!time) {
        time = setTimeout(() => {
          setCanvasSize(new Vector(document.body.clientWidth, document.getElementById('banner')?.clientHeight))
          time = null
        }, 20)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (time) clearTimeout(time)
    }
  }, [ctx])

  return <canvas className="boid-canvas" ref={canvas} />
}

export default BoidCanvas

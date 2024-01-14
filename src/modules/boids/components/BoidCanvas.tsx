import { useRef, useEffect, useState, useCallback } from 'react'

import Boid from '../utility/Boid'
import useMousePosition from 'hooks/useMousePosition'
import Vector from 'utility/Vector'

import '../styles/boid_canvas.css'

const BOID_COUNT = 25
const SPECIES_COUNT = 9
const GROUP_RATE = 4

function BoidCanvas() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const mouse = useMousePosition()
  const [boids, setBoids] = useState<Boid[]>([])
  const [canvasSize, setCanvasSize] = useState<Vector>(new Vector(document.body.clientWidth, 250))

  // Render loop callback
  const renderLoop = useCallback(() => {
    if (ctx == null) return
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    boids.forEach((boid) => {
      boid.draw(ctx)
    })
  }, [ctx, boids])
  const renderRef = useRef(renderLoop)

  // Update loop callback
  const updateLoop = useCallback(() => {
    if (ctx == null) return

    boids.forEach((boid) => {
      const canvasRect = ctx.canvas.getBoundingClientRect()
      boid.update(
        boids,
        new Vector(ctx.canvas.width, ctx.canvas.height),
        mouse.from().sub(new Vector(canvasRect.left, canvasRect.top)),
      )
    })
  }, [ctx, mouse, boids])
  const updateRef = useRef(updateLoop)

  // Resize canvas and boids on window resize
  const handleResize = useCallback(() => {
    const size = new Vector(document.body.clientWidth, document.getElementById('banner')?.clientHeight)
    const scale = size.from().div(canvasSize)

    if (boids.length > 0) {
      boids.forEach((boid) => (boid.pos = boid.pos.mul(scale)))
      setBoids(boids)
    }

    setCanvasSize(size.from())

    if (ctx != null) {
      ctx.canvas.width = size.x
      ctx.canvas.height = size.y

      renderRef.current()
    }
  }, [boids, canvasSize, ctx])
  const resizeRef = useRef(handleResize)

  // Add resize event listener
  useEffect(() => {
    let time: ReturnType<typeof setTimeout> | null

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (time) clearTimeout(time)
    }
  }, [handleResize])

  // Init canvas and boids
  useEffect(() => {
    if (canvas.current != null) {
      const size = new Vector(document.body.clientWidth, document.getElementById('banner')?.clientHeight ?? 250)
      canvas.current.width = size.x
      canvas.current.height = size.y
      setCtx(canvas.current.getContext('2d'))
      setCanvasSize(size)

      const boidArray: Boid[] = []
      for (let i = 0; i < BOID_COUNT * SPECIES_COUNT; i++) {
        boidArray.push(new Boid(i, Vector.random(size.x, size.y), i % GROUP_RATE, i % SPECIES_COUNT))
      }
      setBoids(boidArray)

      resizeRef.current()
    }
  }, [canvas])

  // Update render and update loops refs
  useEffect(() => {
    renderRef.current = renderLoop
  }, [renderLoop])
  useEffect(() => {
    updateRef.current = updateLoop
  }, [updateLoop])

  // start render loop
  useEffect(() => {
    const interval = setInterval(() => {
      renderRef.current()
      updateRef.current()
    }, 20)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <canvas className="boid-canvas" ref={canvas} />
}

export default BoidCanvas

import { useState, useEffect } from 'react'

import Vector from 'utility/Vector'

/**
 * A hook that returns the current mouse position.
 * @returns - The current mouse position as a vector.
 */
function useMousePosition() {
  const [mousePos, setMousePos] = useState<Vector>(Vector.Zero)
  const [updatePos, setUpdatePos] = useState<Vector>(Vector.Zero)
  const [time, setTime] = useState<ReturnType<typeof setTimeout> | null>()

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setUpdatePos(new Vector(e.clientX, e.clientY))
      if (!time) {
        setTime(
          setTimeout(() => {
            setMousePos(updatePos)
            setTime(null)
          }, 100),
        )
      }
    }

    window.addEventListener('mousemove', updatePosition)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
    }
  }, [time, updatePos])

  return mousePos
}

export default useMousePosition

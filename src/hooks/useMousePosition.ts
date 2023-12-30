import { useState, useEffect } from 'react'

import Vector from 'utility/Vector'

function useMousePosition() {
  const [mousePos, setMousePos] = useState<Vector>(Vector.zero())
  const [updatePos, setUpdatePos] = useState<Vector>(Vector.zero())
  const [time, setTime] = useState<number | null>()

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

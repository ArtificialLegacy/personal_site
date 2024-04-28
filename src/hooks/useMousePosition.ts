import { useState, useEffect } from 'react'

import Vector from 'utility/Vector'

/**
 * A hook that returns the current mouse position.
 * @returns - The current mouse position as a vector.
 */
function useMousePosition() {
    const [mousePos, setMousePos] = useState<Vector>(Vector.Zero)

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setMousePos(new Vector(e.clientX, e.clientY))
        }

        window.addEventListener('mousemove', updatePosition)

        return () => {
            window.removeEventListener('mousemove', updatePosition)
        }
    }, [])

    return mousePos
}

export default useMousePosition

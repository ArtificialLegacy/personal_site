/**
 * Converts radians to degrees.
 * @param rad - Radians to convert.
 * @returns - The converted value in degrees.
 */
function radtodeg(rad: number): number {
  return (rad * 180) / Math.PI
}

export default radtodeg

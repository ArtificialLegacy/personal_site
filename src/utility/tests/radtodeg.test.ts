import radtodeg from 'utility/radtodeg'

describe('radtodeg', () => {
  it('should convert radians to degrees', () => {
    expect(radtodeg(Math.PI)).toBe(180)
    expect(radtodeg(Math.PI / 2)).toBe(90)
    expect(radtodeg(0)).toBe(0)
  })
})

import degtorad from '../degtorad'

describe('degtorad', () => {
    it('should convert degrees to radians', () => {
        expect(degtorad(180)).toBe(Math.PI)
        expect(degtorad(90)).toBe(Math.PI / 2)
        expect(degtorad(0)).toBe(0)
    })
})

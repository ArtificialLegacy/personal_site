import projectGetPrev from '../project_get_prev'

import { blubify, upscaleCli, portfolio } from 'data/projects'

describe('projectGetPrev', () => {
    const projects = [blubify, upscaleCli, portfolio]

    it('should get the previous project', () => {
        expect(projectGetPrev(0, projects)).toBe(2)
        expect(projectGetPrev(1, projects)).toBe(0)
        expect(projectGetPrev(2, projects)).toBe(1)
    })

    it('should get the previous project with an offset', () => {
        expect(projectGetPrev(0, projects, 2)).toBe(1)
        expect(projectGetPrev(1, projects, 2)).toBe(2)
        expect(projectGetPrev(2, projects, 2)).toBe(0)
    })
})

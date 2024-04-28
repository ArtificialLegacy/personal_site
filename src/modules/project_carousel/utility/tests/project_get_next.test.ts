import projectGetNext from '../project_get_next'

import { blubify, upscaleCli, portfolio } from 'data/projects'

describe('projectGetNext', () => {
    const projects = [blubify, upscaleCli, portfolio]

    it('should get the next project', () => {
        expect(projectGetNext(0, projects)).toBe(1)
        expect(projectGetNext(1, projects)).toBe(2)
        expect(projectGetNext(2, projects)).toBe(0)
    })

    it('should get the next project with an offset', () => {
        expect(projectGetNext(0, projects, 2)).toBe(2)
        expect(projectGetNext(1, projects, 2)).toBe(0)
        expect(projectGetNext(2, projects, 2)).toBe(1)
    })
})

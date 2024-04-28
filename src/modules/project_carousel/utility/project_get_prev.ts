import type { Project } from 'modules/project_card'

/**
 * Gets the index of the previous project in the list, wrapping around if necessary.
 * @param current - The index of the current project.
 * @param projects - The list of projects.
 * @param offset - The amount of projects to decrement through.
 * @returns - The index of the previous project.
 */
function projectGetPrev(current: number, projects: Project[], offset = 1): number {
    const prev = current - offset
    return prev < 0 ? projects.length - -prev : prev
}

export default projectGetPrev

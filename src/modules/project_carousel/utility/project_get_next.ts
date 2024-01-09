import type { Project } from 'modules/project_card'

/**
 * Gets the index of the next project in the list, wrapping around if necessary.
 * @param current - The index of the current project.
 * @param projects - The list of projects.
 * @param offset - The amount of projects to increment through.
 * @returns - The index of the next project.
 */
function projectGetNext(current: number, projects: Project[], offset = 1): number {
  const next = current + offset
  return next >= projects.length ? next - projects.length : next
}

export default projectGetNext

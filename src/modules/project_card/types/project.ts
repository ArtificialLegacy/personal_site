type ProjectLinkSource = 'github'

type ProjectLink = {
  from: ProjectLinkSource
  url: string
  title: string
}

type ProjectTechnology = 'TypeScript' | 'React' | 'Node.js' | 'MariaDB' | 'Go' | 'Real-ESRGAN' | 'Express'

type Project = {
  name: string
  thumbnail: string
  thumbnailAlt: string
  description: string
  featureList: string[]
  links: ProjectLink[]
  technologies: ProjectTechnology[]
}

export type { Project, ProjectLink, ProjectLinkSource, ProjectTechnology }

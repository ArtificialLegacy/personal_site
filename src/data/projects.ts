import type { Project, ProjectLink } from 'modules/project_card'

const blubify: Project = {
  name: 'Blubify',
  thumbnail: 'blubify.png',
  thumbnailAlt: 'Thumbnail image showing a screenshot of the blubify web interface',
  description: `Blubify is a self-hostable frontend and backend service for streaming and managing music within your own
  network. A passion project built to allow the use of a diverse range of music without limitations such as
  songs being removed from playlists unexpectedly. Actively developed and maintained.`,
  links: [
    {
      from: 'github',
      url: 'https://github.com/ArtificialLegacy/blubify',
      title: 'Blubify GitHub Repository',
    } as ProjectLink,
  ],
  technologies: ['TypeScript', 'Node.js', 'React', 'MariaDB'],
}

const upscaleCli: Project = {
  name: 'Upscale CLI',
  thumbnail: 'upscale-cli.png',
  thumbnailAlt: 'Thumbnail image showing a screenshot of the upscale-cli tool',
  description: 'A CLI tool for running and batching tasks with Real-ESRGAN.',
  links: [
    {
      from: 'github',
      url: 'https://github.com/ArtificialLegacy/upscale-cli',
      title: 'Upscale CLI GitHub Repository',
    } as ProjectLink,
  ],
  technologies: ['TypeScript', 'Node.js', 'Real-ESRGAN'],
}

const portfolio: Project = {
  name: 'Personal Site',
  thumbnail: 'portfolio.png',
  thumbnailAlt: 'Thumbnail image showing a screenshot of this portfolio website',
  description:
    'Besides being used as a portfolio, it is a playground for experimenting with different simulations and animations for the banner.',
  links: [
    {
      from: 'github',
      url: 'https://github.com/ArtificialLegacy/personal_site',
    } as ProjectLink,
  ],
  technologies: ['TypeScript', 'React'],
}

export { blubify, upscaleCli, portfolio }

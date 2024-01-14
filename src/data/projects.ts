import type { Project, ProjectLink } from 'modules/project_card'

const blubify: Project = {
  name: 'Blubify',
  thumbnail: 'blubify.png',
  thumbnailAlt: 'Thumbnail image showing a screenshot of the blubify web interface',
  description: `Blubify is a self-hostable service designed for music streaming and management within your private network.`,
  featureList: [
    'Downloading audio from the YouTube API.',
    'Node.js backend with Express.',
    'Communicates with a MariaDB database using Kysely.',
    'Music streaming using a chunked HTTP response.',
  ],
  links: [
    {
      from: 'github',
      url: 'https://github.com/ArtificialLegacy/blubify',
      title: 'Blubify GitHub Repository',
    } as ProjectLink,
  ],
  technologies: ['TypeScript', 'Node.js', 'React', 'MariaDB', 'Express'].reverse() as Project['technologies'],
}

const upscaleCli: Project = {
  name: 'Upscale CLI',
  thumbnail: 'upscale-cli.png',
  thumbnailAlt: 'Thumbnail image showing a screenshot of the upscale-cli tool',
  description:
    'Upscale-CLI is a commandline interface tool designed for running and batching tasks using Real-ESRGAN, and allows for downloading and managing the models.',
  featureList: [
    'Downloads the REAL-ESRGAN models and extracts them automatically.',
    'Allows for batching an entire folder of images to upscale in order.',
  ],
  links: [
    {
      from: 'github',
      url: 'https://github.com/ArtificialLegacy/upscale-cli',
      title: 'Upscale CLI GitHub Repository',
    } as ProjectLink,
  ],
  technologies: ['TypeScript', 'Node.js', 'Real-ESRGAN'].reverse() as Project['technologies'],
}

const portfolio: Project = {
  name: 'Personal Site',
  thumbnail: 'portfolio.png',
  thumbnailAlt: 'Thumbnail image showing a screenshot of this portfolio website',
  description:
    'Besides being used as a portfolio, it is a playground for experimenting with different simulations and animations for the banner.',
  featureList: [
    'Automated deployment using GitHub Actions to GitHub Pages.',
    'Includes animations and simulations of math and systems that I find interesting.',
  ],
  links: [
    {
      from: 'github',
      url: 'https://github.com/ArtificialLegacy/personal_site',
    } as ProjectLink,
  ],
  technologies: ['TypeScript', 'React'].reverse() as Project['technologies'],
}

export { blubify, upscaleCli, portfolio }

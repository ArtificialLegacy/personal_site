import { ProjectTechnology } from '../types/project'

/**
 * Returns the icon for the given technology.
 * @param tech - The technology to get the icon for.
 * @returns - File name of the icon in the public folder.
 */
function projectTechIcon(tech: ProjectTechnology): string {
    switch (tech) {
        case 'TypeScript':
            return 'ts-logo-round-128.svg'
        case 'React':
            return 'react-logo.png'
        case 'Node.js':
            return 'nodejs-logo.png'
        case 'MariaDB':
            return 'mariadb-logo.svg'
        case 'Go':
            return 'Go-Logo_Blue.svg'
        case 'Real-ESRGAN':
            return 'realesrgan-logo.png'
        case 'Express':
            return 'expressjs-icon.svg'
        case 'Lua':
            return 'Lua-Logo_64x64.png'
        case 'Docker':
            return 'docker-mark-blue.svg'
    }

    return ''
}

export default projectTechIcon

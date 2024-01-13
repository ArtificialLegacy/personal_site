import type { Tech } from 'modules/tech_list'

const typescript: Tech = {
  title: 'TypeScript',
  percentage: 100,
  icon: 'ts-logo-round-128.svg',
}

const nodejs: Tech = {
  title: 'Node.js',
  percentage: 80,
  icon: 'nodejs-logo.png',
}

const react: Tech = {
  title: 'React',
  percentage: 60,
  icon: 'react-logo.png',
}

const mariadb: Tech = {
  title: 'MariaDB',
  percentage: 25,
  icon: 'mariadb-logo.svg',
}

const express: Tech = {
  title: 'Express.js',
  percentage: 45,
  icon: 'expressjs-icon.svg',
}

const html: Tech = {
  title: 'HTML',
  percentage: 85,
  icon: 'HTML5_logo_and_wordmark.svg',
}

const css: Tech = {
  title: 'CSS',
  percentage: 65,
  icon: 'CSS3_logo_and_wordmark.svg',
}

const git: Tech = {
  title: 'Git',
  percentage: 80,
  icon: 'Git-Icon-White.svg',
}

const jest: Tech = {
  title: 'Jest',
  percentage: 50,
  icon: 'jest.png',
}

const go: Tech = {
  title: 'Go',
  percentage: 10,
  icon: 'Go-Logo_Blue.svg',
}

const tech: Tech[] = [typescript, nodejs, react, mariadb, express, html, css, git, jest, go]

tech.sort((a, b) => b.percentage - a.percentage)

export { tech }

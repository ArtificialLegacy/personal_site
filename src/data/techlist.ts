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
  percentage: 75,
  icon: 'react-logo.png',
}

const mariadb: Tech = {
  title: 'MariaDB',
  percentage: 25,
  icon: 'mariadb-logo.svg',
}

const express: Tech = {
  title: 'Express.js',
  percentage: 55,
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
  percentage: 60,
  icon: 'Git-Icon-White.svg',
}

const jest: Tech = {
  title: 'Jest',
  percentage: 50,
  icon: 'jest.png',
}

const go: Tech = {
  title: 'Go',
  percentage: 20,
  icon: 'Go-Logo_Blue.svg',
}

const lua: Tech = {
  title: 'Lua',
  percentage: 20,
  icon: 'Lua-Logo_64x64.png',
}

const tech: Tech[] = [typescript, nodejs, react, mariadb, express, html, css, git, jest, go, lua]

tech.sort((a, b) => b.percentage - a.percentage)

export { tech }

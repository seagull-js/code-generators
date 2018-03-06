import Class from './class'
import generateAPI from './generate_api'

export default function generateRobotsTxt(): Class {
  const body = `
    const txt = \`
      User-agent: *
      Disallow:
    \`
    return this.text(txt)
  `
  const opts = { path: '/robots.txt', method: 'GET', body }
  const gen = generateAPI('Frontent', opts)
  return gen
}

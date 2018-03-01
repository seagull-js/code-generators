import { mkdirSync, writeFileSync } from 'fs'
import { toPairs } from 'lodash'
import { join } from 'path'
import * as shell from 'shelljs'
import * as Gen from './index'

export default class App {
  dir: { [file: string]: string }

  constructor(private name: string, seagullVersion: string = '0.1.0') {
    const dir = {}
    dir['package.json'] = Gen.generatePackageJson(name, seagullVersion)
    dir['tsconfig.json'] = Gen.generateTsconfigJson()
    dir['tslint.json'] = Gen.generateTslintJson()
    dir['backend/api/Frontend.ts'] = Gen.generateSsrApi()
    dir['frontend/pages/hello.tsx'] = Gen.generatePage('HelloPage', {
      path: '/',
    })
    this.dir = dir
  }

  toFolder(path: string) {
    this.createFolderStructure(path)
    toPairs(this.dir).forEach(([file, text]) => {
      writeFileSync(join(path, file), text)
    })
  }

  createFolderStructure(path: string) {
    mkdirSync(path)
    mkdirSync(join(path, 'backend'))
    mkdirSync(join(path, 'backend', 'api'))
    mkdirSync(join(path, 'frontend'))
    mkdirSync(join(path, 'frontend/pages'))
    mkdirSync(join(path, 'frontend/assets'))
    mkdirSync(join(path, 'frontend/assets/favicons'))
  }
}

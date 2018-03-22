import { generatePackageJson } from '@lib'
import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'

@suite
class CodegenPackageJsonTest {
  @test
  'can be initialized'() {
    const gen = generatePackageJson('demo', '0.1.2')
    expect(gen).to.be.an('object')
  }

  @test
  'name gets passed into file'() {
    const gen = generatePackageJson('demo', '0.1.2')
    const code = gen.toString()
    expect(code).to.contain(`"name": "demo"`)
  }

  @test
  'sets dev deps for the end user'() {
    const gen = generatePackageJson('demo', '0.1.2')
    const code = gen.toString()
    expect(code).to.contain(`"aws-sdk": "^2.104.0"`)
    expect(code).to.contain(`"typescript": "^2.7.2"`)
  }
}

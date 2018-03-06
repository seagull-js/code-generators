import { generateRobotsTxt } from '@lib'
import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'

@suite
class CodegenGenerateRobotsTxtTest {
  @test
  'can be initialized'() {
    const gen = generateRobotsTxt()
    expect(gen).to.be.an('object')
  }

  @test
  'contains allow all directive by default'() {
    const gen = generateRobotsTxt()
    const code = gen.toString()
    expect(code).to.contain('User-agent: *')
    expect(code).to.contain('Disallow:')
  }
}

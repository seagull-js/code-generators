import { generateShrimp } from '@lib'
import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'

@suite
class CodegenGenerateShrimpTest {
  @test
  'can generate minimal Shrimp'() {
    const gen = generateShrimp('MyModel', { fields: [] })
    const code = gen.toString()
    expect(code).to.contain(`import { field, Shrimp } from '@seagull`)
    expect(code).to.contain('export default class MyModel extends Shrimp {}')
  }

  @test
  'can generate Shrimp with fields'() {
    const fields = [
      { name: 'done', type: 'boolean', initial: 'false' },
      { name: 'text', type: 'string', initial: `''` },
    ]
    const gen = generateShrimp('MyModel', { fields })
    const code = gen.toString()
    expect(code).to.contain(`import { field, Shrimp } from '@seagull`)
    expect(code).to.contain('export default class MyModel extends Shrimp {')
    expect(code).to.contain(`@field done: boolean = false`)
    expect(code).to.contain(`@field text: string = ''`)
  }
}

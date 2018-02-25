import { App } from '@lib'
import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import Test from '../helper/functional_test'

@suite('Generate::App')
class FunctionalTest extends Test {
  before() {
    this.mockFolder('./tmp')
  }
  after() {
    this.restoreFolder()
  }

  @test
  'can be initialized'() {
    const gen = new App('demo', '0.1.0')
    expect(gen).to.be.an('object')
  }

  @test
  'can be write to folder'() {
    const gen = new App('demo', '0.1.0')
    expect(gen).to.be.an('object')
    gen.toFolder('./tmp/demo')
  }
}

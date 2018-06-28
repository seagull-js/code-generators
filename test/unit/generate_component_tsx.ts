import { generateComponentTsx } from '@lib'
import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'

@suite
class CodegenGenerateComponentTsxTest {
  @test
  'can be initialized'() {
    const gen = generateComponentTsx('MyDiv')
    expect(gen).to.be.an('object')
  }

  @test
  'begins with correct react import'() {
    const gen = generateComponentTsx('MyDiv')
    const code = gen.toString()
    expect(code).to.contain(`import * as React from 'react'`)
  }

  @test
  'when function, contains props-children param'() {
    const gen = generateComponentTsx('MyDiv', false)
    const code = gen.toString()
    expect(code).to.contain(`function MyDiv({ children }) {`)
  }

  @test
  'when class, contains render method'() {
    const gen = generateComponentTsx('MyDiv', true)
    const code = gen.toString()
    expect(code).to.contain(`render() {`)
  }

  @test
  'when class, contains knterfaces for state/props'() {
    const gen = generateComponentTsx('MyDiv', true)
    const code = gen.toString()
    expect(code).to.contain(`export interface IProps`)
    expect(code).to.contain(`export interface IState`)
  }
}

import { generatePage } from '@lib'
import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'

@suite
class CodegenGeneratePageTest {
  @test
  'can generate minimal API'() {
    const gen = generatePage('MyPage', { path: '/' })
    const code = gen.toString()
    expect(code).to.contain('export default class MyPage extends Page<{}, {}>')
  }

  @test
  'begins with correct react import'() {
    const gen = generatePage('MyPage', { path: '/' })
    const code = gen.toString()
    expect(code).to.contain(`import * as React from 'react'`)
  }

  @test
  'contains correct Page import'() {
    const gen = generatePage('MyPage', { path: '/something' })
    const code = gen.toString()
    expect(code).to.contain(`import { Page } from '@seagull/core'`)
  }

  @test
  'contains corrent path as prop if not path is set'() {
    const gen = generatePage('MyPage', { path: '' })
    const code = gen.toString()
    expect(code).to.contain(`path: string = '/'`)
  }

  @test
  'contains corrent path as prop if only a slash is set as path'() {
    const gen = generatePage('MyPage', { path: '/' })
    const code = gen.toString()
    expect(code).to.contain(`path: string = '/'`)
  }

  @test
  'contains correct path as prop without a slash is set in front'() {
    const gen = generatePage('MyPage', { path: 'something' })
    const code = gen.toString()
    expect(code).to.contain(`path: string = '/something'`)
  }

  @test
  'contains correct path as prop if path is set with slash in front'() {
    const gen = generatePage('MyPage', { path: '/something' })
    const code = gen.toString()
    expect(code).to.contain(`path: string = '/something'`)
  }

  @test
  'contains render method'() {
    const gen = generatePage('MyPage', { path: '/something' })
    const code = gen.toString()
    expect(code).to.contain('render() {')
    expect(code).to.contain('<h1>Hello World!</h1>')
  }
}

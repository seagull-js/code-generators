import { generateAPI } from '@lib'
import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { join } from 'path'

@suite
class CodegenGenerateApiTest {
  @test
  'can generate minimal API'() {
    const gen = generateAPI('MyAPI', {})
    const code = gen.toString()
    expect(code).to.contain(`import { API, Request, Response } from '@seagull`)
    expect(code).to.contain('export default class MyAPI extends API {')
    expect(code).to.contain('async handle(request: Request): Promise<Response>')
  }

  @test
  'can generate API with path as empty string'() {
    const opts = { path: '' }
    const gen = generateAPI('MyAPI', opts)
    const code = gen.toString()
    expect(code).to.contain(`static path: string = '/'`)
    expect(code).to.contain(`static method: string = 'GET'`)
  }

  @test
  'can generate API with path with a slash as string and automatic method addition'() {
    const opts = { path: '/' }
    const gen = generateAPI('MyAPI', opts)
    const code = gen.toString()
    expect(code).to.contain(`static path: string = '/'`)
    expect(code).to.contain(`static method: string = 'GET'`)
  }

  @test
  'can generate API with path and automatic method addition'() {
    const opts = { path: '/hi' }
    const gen = generateAPI('MyAPI', opts)
    const code = gen.toString()
    expect(code).to.contain(`static path: string = '/hi'`)
    expect(code).to.contain(`static method: string = 'GET'`)
  }

  @test
  'can generate API with path and explicit method'() {
    const opts = { path: '/ho', method: 'POST' }
    const gen = generateAPI('MyAPI', opts)
    const code = gen.toString()
    expect(code).to.contain(`static path: string = '/ho'`)
    expect(code).to.contain(`static method: string = 'POST'`)
  }

  @test
  'can generate API with explicit method'() {
    const opts = { method: 'GET' }
    const gen = generateAPI('MyAPI', opts)
    const code = gen.toString()
    expect(code).to.contain(`static method: string = 'GET'`)
  }

  @test
  'can generate API with path activated CORS'() {
    const opts = { path: '/ha', cors: true }
    const gen = generateAPI('MyAPI', opts)
    const code = gen.toString()
    expect(code).to.contain(`static path: string = '/ha'`)
    expect(code).to.contain(`static cors: boolean = true`)
  }

  @test
  'can generate API with activated cache'() {
    const opts = { path: '/ha', cache: 60 }
    const gen = generateAPI('MyAPI', opts)
    const code = gen.toString()
    expect(code).to.contain(`static cache: number = 60`)
  }

  @test
  'can generate API without cache'() {
    const opts = { path: '/ha' }
    const gen = generateAPI('MyAPI', opts)
    const code = gen.toString()
    expect(code).to.contain(`static cache: number = 0`)
  }
}

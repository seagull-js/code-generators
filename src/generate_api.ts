import { isString } from 'lodash'
import Class from './class'

export interface IOptions {
  path?: string
  method?: string
  cors?: boolean
  body?: string
  cache?: number
}

export default function generateAPI(name: string, options: IOptions): Class {
  const gen = new Class(name, 'API')
  gen.addNamedImports('@seagull/core', ['API', 'Request', 'Response'])

  if (isString(options.path)) {
    const path = options.path.startsWith('/')
      ? options.path
      : `/${options.path}`
    const docPath = `The URL path where this API will be located. Skip for private functions like cronjobs. Example: '/greetings/{name}'`
    gen.addProp({
      doc: docPath,
      name: 'path',
      static: true,
      type: 'string',
      value: `'${path}'`,
    })
  }

  if (options.method || isString(options.path)) {
    const docMethod = `This is the HTTP method / verb for the API. Defaults to 'GET'`
    gen.addProp({
      doc: docMethod,
      name: 'method',
      static: true,
      type: 'string',
      value: `'${options.method || 'GET'}'`,
    })
  }

  if (options.cors) {
    const docCors = `The URL path where this API will be located. Skip for private functions like cronjobs. Example: '/greetings/{name}'`
    gen.addProp({
      doc: docCors,
      name: 'cors',
      static: true,
      type: 'boolean',
      value: `${!!options.cors}`,
    })
  }

  const cache = typeof options.cache === 'number' ? options.cache : 0
  const docCache = `The duration in seconds this API will get cached`
  gen.addProp({
    doc: docCache,
    name: 'cache',
    static: true,
    type: 'number',
    value: cache.toString(),
  })

  const docHandle = `This handle function executes your code. Return one of the following method invocations: 'text', 'json', 'redirect', 'missing', 'error'`
  gen.addMethod({
    async: true,
    body: options.body || `return this.text('hello world')`,
    doc: docHandle,
    name: 'handle',
    parameter: [{ name: 'request', type: 'Request' }],
    returnType: 'Promise<Response>',
  })

  return gen
}

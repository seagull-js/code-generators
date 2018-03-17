import Class from './class'

export interface IOptions {
  fields: Array<{
    name: string
    type: string
    initial: string
  }>
}

export default function generateShrimp(name: string, options: IOptions): Class {
  const gen = new Class(name, 'Shrimp')
  gen.addNamedImports('@seagull/core', ['field', 'Shrimp'])
  if (!options.fields || !options.fields.length) {
    return gen
  }
  for (const field of options.fields) {
    if (!field.name || !field.type || !field.initial) {
      continue
    }
    gen.addProp({
      decorators: [{ name: 'field' }],
      name: field.name,
      type: field.type,
      value: field.initial,
    })
  }
  return gen
}

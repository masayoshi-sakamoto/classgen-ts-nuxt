import { OpenAPIObject, ReferenceObject, SchemaObject } from 'openapi3-ts'

import Inflector from './lib/inflector'
import { toCamelCase } from './lib/snake-camel'
const inflector = new Inflector()
const rimraf = require('rimraf')

// swagger-type: typescript-type
export const types: { [key: string]: string } = {
  array: 'Array',
  list: 'Array',
  boolean: 'boolean',
  string: 'string',
  int: 'number',
  float: 'number',
  number: 'number',
  long: 'number',
  short: 'number',
  char: 'string',
  double: 'number',
  object: 'any',
  integer: 'number',
  map: 'any',
  date: 'string',
  datetime: 'Date',
  binary: 'string',
  bytearray: 'string',
  uuid: 'string',
  file: 'File',
  error: 'Error'
}

type ITsSchema = {
  key?: string
  tstype?: string
  title?: string
  properties?: ITsSchema
  ref?: boolean
  required?: boolean
  nullable?: boolean
  default?: any
}

export default class OpenAPIParser {
  constructor(protected ymlData: OpenAPIObject) {}

  parse(options?: any) {
    const components = this.ymlData.components || {}
    const schemas = components.schemas || {}

    const definitions = Object.keys(schemas).map((key) => {
      return {
        name: key,
        refs: this.refs(key, schemas[key]),
        schema: this.schema(key, schemas[key]),
        seed: !!key.match(/.+(Seed)$/)
      }
    })
    return definitions
  }

  private refs(key: string, value: SchemaObject) {
    if (value.$ref !== undefined) {
      return {
        name: toCamelCase(key)
      }
    } else if (value.properties !== undefined) {
      const refs = Object.keys(value.properties).reduce((props: { [key: string]: any }, key) => {
        if (value.properties![key].$ref !== undefined) {
          props[key] = this.refs(key, value.properties![key])
        }
        return props
      }, {})
      return refs
    }
  }

  private schema(key: string, value: SchemaObject, required: boolean = false) {
    let schema: ITsSchema = {
      ref: false,
      title: value.title,
      required,
      nullable: value.nullable,
      default: value.default || 'null'
    }

    if (value.$ref !== undefined) {
      schema = {
        ...schema,
        key: key,
        tstype: toCamelCase(key),
        ref: true
      }
    } else if (value.type !== undefined) {
      schema = {
        ...schema,
        key: key + (required ? '' : '?'),
        tstype: types[value.type.toLowerCase()] + (value.nullable ? ' | null' : '')
      }
    } else if (value.properties !== undefined) {
      const properties = Object.keys(value.properties).reduce((props: { [key: string]: any }, key) => {
        props[key] = this.schema(key, value.properties![key], (value.required || []).includes(key))
        return props
      }, {})
      schema = properties
    }
    return schema
  }
}

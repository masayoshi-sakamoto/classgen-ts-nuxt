import { OpenAPIObject, PathObject, SchemaObject } from 'openapi3-ts'
import Inflector from './lib/inflector'
import { toCamelCase, toUnderscoreCase } from './lib/snake-camel'
import { IConfig, IModel, IRef, ITsSchema, types } from './types'

const inflector = new Inflector()
const rimraf = require('rimraf')

export default class OpenAPIParser {
  constructor(protected ymlData: OpenAPIObject) {}

  parse(config?: IConfig) {
    const schemas = this.ymlData.components!.schemas || {}
    const paths = this.ymlData.paths || {}
    const tags = this.parsePaths(paths)

    const definitions: IModel[] = Object.keys(schemas).flatMap((key) => {
      return {
        table: inflector.pluralize(toUnderscoreCase(key)),
        name: key,
        refs: this.refs(key, schemas[key]),
        schema: this.schema(key, schemas[key]),
        seed: !!key.match(/.+(Seed)$/)
      }
      return []
    })
    return {
      paths: tags,
      models: definitions || []
    }
  }

  private refs(key: string, value: SchemaObject): IRef[] {
    if (value.$ref !== undefined) {
      return [{ name: toCamelCase(key) }]
    } else if (value.properties !== undefined) {
      const refs = Object.keys(value.properties).flatMap((key) => {
        if (value.properties![key].$ref !== undefined) {
          return this.refs(key, value.properties![key])
        }
        return []
      })
      return refs
    }
    return []
  }

  private schema(key: string, value: SchemaObject, required: boolean = false) {
    let schema: ITsSchema = {
      ref: false,
      array: false,
      title: value.title,
      required,
      nullable: value.nullable,
      default: value.default || 'null',
      format: value.format
    }
    if (value.$ref !== undefined) {
      const name = value.$ref.split('/').pop()
      schema = {
        ...schema,
        key: toUnderscoreCase(name),
        tstype: name,
        ref: true
      }
    } else if (value.type !== undefined && value.type === 'array') {
      const data = this.schema(key, value.items as SchemaObject)
      schema = {
        ...data,
        array: true
      }
    } else if (value.type !== undefined && value.type !== 'object') {
      schema = {
        ...schema,
        key,
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

  parsePaths(paths: PathObject) {
    return Object.values(paths)
      .map((prop) => {
        const item = Object.keys(prop).map((key) => {
          return prop[key]
        })
        const items = item.reduce((result, prop) => {
          const tags = prop.tags ? prop.tags[0] : undefined
          result.push({
            ...prop,
            tags
          })
          return result
        }, [])
        return items
      })
      .flat()
      .reduce((result: { [key: string]: any }, prop) => {
        result[prop.tags] = {
          ...result[prop.tags],
          [prop.operationId]: {
            ...prop,
            requestBody: prop.requestBody ? this.parseRequestBody(prop.requestBody) : undefined,
            responses: this.parseResponse(prop.responses)
          }
        }
        return result
      }, {})
  }

  parseRequestBody(body: any) {
    return this.schema('responses', body.content['application/json'].schema)
  }

  parseResponse(responses: any) {
    if (responses) {
      return Object.values(responses)
        .map((prop: any) => {
          return Object.values(this.schema('responses', prop.content['application/json'].schema))
        })
        .flat()
    }
    return []
  }
}

import { Create, Parser } from 'node-sql-parser'
const YAML = require('json2yaml')

import { Options } from './generator'
import { toCamelCase } from './lib/snake-camel'
import Inflector from './lib/inflector'
const inflector = new Inflector()

export default class SQLParser {
  private sqlData: string[]

  constructor(sql: string, protected options: Options) {
    this.sqlData = sql.replace(/\r\n/g, '\n').replace(/\n/g, '').replace(/;/g, ';\n').split('\n')
  }

  parse(config: any) {
    this.options.excludes = config ? config.models.excludes : []
    const excludes = config ? config.schemas.excludes : []
    const parser = new Parser()
    const sqls = this.sqlData.filter((sql) => /^(CREATE TABLE|create table)/.test(sql))
    let yamls = []

    for (const sql of sqls) {
      const ast = parser.astify(sql, { database: 'MySQL' }) as Create[]
      const model = ast[0].table ? ast[0].table[0].table : undefined

      if (
        model &&
        !excludes.includes(model) &&
        inflector.plural(model) &&
        ((this.options.model && this.options.model === model) || !this.options.model)
      ) {
        const table = {
          table: model,
          columns: ast[0].create_definitions
            ? ast[0].create_definitions.flatMap((prop) =>
                prop.column ? { property: prop.column.column as string, definition: prop.definition, comment: prop.comment } : []
              )
            : []
        }

        yamls.push({
          name: inflector.singularize(table.table),
          index: YAML.stringify({
            required: table.columns?.flatMap((prop) => (!this.options.excludes!.includes(prop.property) ? prop.property : [])),
            properties: this.properties(table.columns, 'index')
          }),
          seed: YAML.stringify({
            required: table.columns?.flatMap((prop) =>
              prop.property !== 'id' && !this.options.excludes!.includes(prop.property) ? prop.property : []
            ),
            properties: this.properties(table.columns, 'seed')
          })
        })
      }
    }

    return yamls
  }

  private properties(columns: { property: string; definition: any; comment: any }[], type: string) {
    const properties: { [id: string]: any } = {}

    for (const column of columns) {
      if (!this.options.excludes!.includes(column.property)) {
        if (type === 'index' && column.property.match(/.+_id$/)) {
          const relation = column.property.replace(/(.+)_id$/, '$1')
          properties[relation] = {
            $ref: '#/components/schemas/' + toCamelCase(relation)
          }
        }
        properties[column.property] = this.property(column.property, column.definition.dataType, column.comment, type)
      }
    }
    return properties
  }

  private property(name: string, dataType: string, comment: any, type: string) {
    const property = {
      type: 'any',
      format: undefined,
      title: comment ? comment.value.value : undefined,
      nullable: name === 'id' && type !== 'seed' ? undefined : true,
      default: name === 'id' && type !== 'seed' ? '' : null
    }

    switch (dataType) {
      case 'VARCHAR':
        return { ...property, type: 'string' }
      case 'TEXT':
        return { ...property, type: 'string' }
      case 'CHAR':
        return { ...property, type: 'string' }
      case 'LONGTEXT':
        return { ...property, type: 'string' }
      case 'DATETIME':
        return { ...property, type: 'string', format: 'date-time' }
      case 'DATE':
        return { ...property, type: 'string', format: 'date' }
      case 'TIMESTAMP':
        return { ...property, type: 'string', format: 'date-time' }
      case 'TINYINT':
        return { ...property, type: 'boolean', default: false }
      case 'INT':
        return { ...property, type: 'integer', format: 'int32', default: 0 }
      case 'BIGINT':
        return { ...property, type: 'integer', format: 'int64', default: 0 }
    }

    return property
  }
}

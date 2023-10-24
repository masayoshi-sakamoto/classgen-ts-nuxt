import { Create, Parser } from 'node-sql-parser'
import { toCamelCase } from './lib/snake-camel'
import Inflector from './lib/inflector'
import { IColumn, IConfig, IProperties, IProperty, IYAML, types } from './types'
import { IOptions } from './options'
import { snake, upperCamel } from './common'

const YAML = require('json2yaml')
const inflector = new Inflector()

export default class SQLParser {
  private sqlData: string[]

  constructor(sql: string, protected options: IOptions) {
    // 取得してきたSQL文を1行ずつに変更してCREATE TABLE文のみ取得
    this.sqlData = sql
      .replace(/\r\n/g, '\n')
      .replace(/#.*\n/g, '')
      .replace(/\n/g, '')
      .replace(/;/g, ';\n')
      .split('\n')
      .filter((sql) => /^(CREATE TABLE|create table)/.test(sql))
  }

  parse(config: IConfig) {
    const tableExcludes = config && config.tables && config.tables.excludes ? config.tables.excludes : []
    const parser = new Parser()
    let yamls: IYAML[] = []

    for (const sql of this.sqlData) {
      const ast = parser.astify(sql, { database: 'MySQL' }) as Create[]
      const table = ast[0].table ? ast[0].table[0].table : undefined
      const definitions = ast[0].create_definitions || []

      // SQLのCREAT TABLEにあるテーブル名からswaggerを作成するためのデータを取得
      if (
        table && //テーブル名が取得できて
        !tableExcludes.includes(table) && // 除外するテーブル名に含まれていなくて
        inflector.plural(table) && // テーブル名が複数形のときで
        definitions.length > 0
      ) {
        const class_name = snake(inflector.singularize(table))

        // カラムのデータを生成
        let columns: IColumn[] = definitions
          .flatMap((prop) => {
            if (prop.column) {
              return {
                property: prop.column.column as string,
                definition: prop.definition,
                comment: prop.comment ? prop.comment.value.value : undefined
              }
            }
            return []
          })
          .flatMap((prop) => (!this.options.excludes!.index.includes(prop.property) ? prop : []))
        const index = {
          required: columns.map((prop) => prop.property),
          properties: this.properties(columns, 'index')
        }

        // カラムのデータを生成
        columns = definitions
          .flatMap((prop) => {
            if (prop.column) {
              return {
                property: prop.column.column as string,
                definition: prop.definition,
                comment: prop.comment ? prop.comment.value.value : undefined
              }
            }
            return []
          })
          .flatMap((prop) => (!this.options.excludes!.seed.includes(prop.property) ? prop : []))
        const seed = {
          required: columns.flatMap((prop) => (prop.property !== 'id' ? prop.property : [])),
          properties: this.properties(columns, 'seed')
        }

        const path = this.path(class_name, index.properties)
        const paths = this.paths(class_name, index.properties)

        yamls.push({
          table,
          class_name,
          index: YAML.stringify(index),
          seed: YAML.stringify(seed),
          path: YAML.stringify(path),
          paths: YAML.stringify(paths)
        })
      }
    }

    return yamls
  }

  private properties(columns: IColumn[], type: string): IProperties {
    const properties: IProperties = {}

    for (const column of columns) {
      // 通常タイプの時に_idが付くカラムがあった場合はリレーションされているので$refを作成する
      if (type === 'index' && column.property.match(/.+_id$/)) {
        const relation = column.property.replace(/(.+)_id$/, '$1')
        properties[relation] = {
          $ref: '#/components/schemas/' + toCamelCase(relation)
        }
      }
      // それ以外のカラムはdataTypeをもとにプロパティを作成する
      properties[column.property] = this.property(column.property, column.definition.dataType, column.comment, type)
    }
    return properties
  }

  private property(name: string, dataType: string, comment: any, type: string): IProperty {
    const property: IProperty = {
      type: 'any',
      format: undefined,
      title: comment || undefined,
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
        return { ...property, type: 'string', format: 'json' }
      case 'DATETIME':
        return { ...property, type: 'string', format: 'date-time' }
      case 'DATE':
        return { ...property, type: 'string', format: 'date' }
      case 'TIMESTAMP':
        return { ...property, type: 'string', format: 'date-time' }
      case 'TINYINT':
        return { ...property, type: 'boolean', default: false }
      case 'INT':
        return { ...property, type: 'integer', format: 'int32', default: 0, nullable: false }
      case 'BIGINT':
        return { ...property, type: 'integer', format: 'int64', default: 0, nullable: false }
    }

    return property
  }

  private path(class_name: string, properties: IProperties) {
    const ClassName = upperCamel(class_name)
    const parameters = {
      in: 'path',
      className: Object.keys(properties)[0],
      schema: {
        type: types[Object.values(properties)[0].type]
      },
      required: true
    }
    const responses = {
      content: {
        'application/json': {
          schema: {
            required: [class_name],
            type: 'object',
            properties: {
              [class_name]: {
                $ref: `#/components/schemas/${ClassName}`
              }
            }
          }
        }
      }
    }

    return {
      get: {
        tags: ClassName,
        operationId: `Get${ClassName}`,
        parameters,
        responses: {
          200: responses
        }
      },
      put: {
        tags: ClassName,
        operationId: `Put${ClassName}`,
        parameters,
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: `#/components/schemas/${ClassName}Seed`
              }
            }
          }
        },
        responses: {
          201: responses
        }
      },
      delete: {
        tags: ClassName,
        operationId: `Delete${ClassName}`,
        parameters,
        responses: {
          201: responses
        }
      }
    }
  }

  private paths(class_name: string, properties: IProperties) {
    const ClassName = upperCamel(class_name)
    const responses = {
      content: {
        'application/json': {
          schema: {
            required: [class_name],
            type: 'object',
            properties: {
              [class_name]: { $ref: `#/components/schemas/${ClassName}` }
            }
          }
        }
      }
    }
    const order = Object.keys(properties).find((key) => key === 'order')
      ? {
          tags: ClassName,
          operationId: `Order${ClassName}`,
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: `#/components/schemas/${ClassName}Seed` }
                }
              }
            }
          },
          responses: {
            201: responses
          }
        }
      : undefined

    return {
      get: {
        tags: ClassName,
        operationId: `Fetch${ClassName}`,
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  required: [class_name, 'query'],
                  type: 'object',
                  properties: {
                    [class_name]: {
                      type: 'array',
                      items: { $ref: `#/components/schemas/${ClassName}` }
                    },
                    query: { $ref: '#/components/schemas/Query' }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ClassName,
        operationId: `Post${ClassName}`,
        requestBody: {
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${ClassName}Seed` }
            }
          }
        },
        responses: {
          200: responses
        }
      },
      put: order
    }
  }
}

import { Create, Parser } from 'node-sql-parser'
const YAML = require('json2yaml')

import { IOptions, IConfig } from './generator'
import { toCamelCase } from './lib/snake-camel'
import Inflector from './lib/inflector'
const inflector = new Inflector()

export interface IColumn {
  property: string // カラム名
  definition: {
    dataType: string // カラムのタイプ(INT, CHAR, etc..,)
  }
  comment: {
    value: { value: string } // カラムのコメント
  }
}

export interface IYAML {
  table: string // テーブル名
  model: string // モデル名
  index: string // 通常モデルのYAML文
  seed: string // StoreモデルのYAML文
}

export default class SQLParser {
  private sqlData: string[]

  constructor(sql: string, protected options: IOptions) {
    // 取得してきたSQL文を1行ずつに変更してCREATE TABLE文のみ取得
    this.sqlData = sql
      .replace(/\r\n/g, '\n')
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
        (!this.options.model || this.options.table === table) && // モデル名が設定されていないか、されていたら同じときに
        definitions.length > 0
      ) {
        // カラムのデータを生成
        const columns: IColumn[] = definitions
          .flatMap((prop) => {
            if (prop.column) {
              return {
                property: prop.column.column as string,
                definition: prop.definition,
                comment: prop.comment
              }
            }
            return []
          })
          .flatMap((prop) => (!this.options.excludes!.includes(prop.property) ? prop : []))

        yamls.push({
          table,
          model: inflector.singularize(table),
          index: YAML.stringify({
            required: columns.map((prop) => prop.property),
            properties: this.properties(columns, 'index')
          }),
          seed: YAML.stringify({
            required: columns.flatMap((prop) => (prop.property !== 'id' ? prop.property : [])),
            properties: this.properties(columns, 'seed')
          })
        })
      }
    }

    return yamls
  }

  private properties(columns: IColumn[], type: string) {
    const properties: { [id: string]: any } = {}

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

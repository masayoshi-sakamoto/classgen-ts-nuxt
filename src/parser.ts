import { Create, Parser as sqlparser } from 'node-sql-parser'
var YAML = require('json2yaml')

export default class Parser {
  private sqlData: string[]
  private options: any

  constructor(protected sql: string) {
    this.sqlData = sql.replace(/\r\n/g, '\n').replace(/\n/g, '').replace(/;/g, ';\n').split('\n')
  }

  parse(options: any) {
    this.options = options
    this.options.excludes = this.options.excludes || ['created_at', 'updated_at', 'deleted_at']

    const parser = new sqlparser()
    const sqls = this.sqlData.filter((sql) => /^(CREATE TABLE|create table)/.test(sql))
    let yamls = []

    for (const sql of sqls) {
      const ast = parser.astify(sql, { database: 'MySQL' }) as Create[]
      const model = ast[0].table ? ast[0].table[0].table : undefined

      if ((this.options.model && this.options.model === model) || !this.options.model) {
        const table = {
          table: model,
          columns: ast[0].create_definitions
            ? ast[0].create_definitions.flatMap((prop) =>
                prop.column ? { property: prop.column.column as string, definition: prop.definition } : []
              )
            : []
        }

        yamls.push({
          name: table.table,
          index: YAML.stringify({
            required: table.columns?.flatMap((prop) => (!this.options.excludes.includes(prop.property) ? prop.property : [])),
            properties: this.properties(table.columns, 'index')
          }),
          seed: YAML.stringify({
            required: table.columns?.flatMap((prop) =>
              prop.property !== 'id' && !this.options.excludes.includes(prop.property) ? prop.property : []
            ),
            properties: this.properties(table.columns, 'seed')
          })
        })
      }
    }

    return yamls
  }

  private properties(columns: { property: string; definition: any }[], type: string) {
    const properties: { [id: string]: any } = {}

    for (const column of columns) {
      if (!this.options.excludes.includes(column.property)) {
        properties[column.property] = this.types(column.property, column.definition.dataType, type)
      }
    }
    return properties
  }

  private types(property: string, type: string, seed: string) {
    switch (type) {
      case 'VARCHAR':
        return { type: 'string', nullable: property === 'id' && seed !== 'seed' ? undefined : true }
      case 'TEXT':
        return { type: 'string', nullable: property === 'id' && seed !== 'seed' ? undefined : true }
      case 'CHAR':
        return { type: 'string', nullable: property === 'id' && seed !== 'seed' ? undefined : true }
      case 'LONGTEXT':
        return { type: 'string', nullable: property === 'id' && seed !== 'seed' ? undefined : true }
      case 'DATETIME':
        return { type: 'string', format: 'date-time', nullable: true }
      case 'DATE':
        return { type: 'string', format: 'date', nullable: true }
      case 'TIMESTAMP':
        return { type: 'string', format: 'date-time', nullable: true }
      case 'TINYINT':
        return { type: 'boolean' }
      case 'INT':
        return { type: 'integer', format: 'int32' }
      case 'BIGINT':
        return { type: 'integer', format: 'int64' }
    }
    return undefined
  }
}

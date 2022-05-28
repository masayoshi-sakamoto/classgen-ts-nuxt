import { Create, Parser as sqlparser } from 'node-sql-parser'
var YAML = require('json2yaml')

export default class Parser {
  private sqlData: string[]
  constructor(protected sql: string) {
    this.sqlData = sql.replace(/\r\n/g, '\n').replace(/\n/g, '').replace(/;/g, ';\n').split('\n')
  }

  parse() {
    const parser = new sqlparser()
    const sqls = this.sqlData.filter((sql) => /^(CREATE TABLE|create table)/.test(sql))

    for (const sql of sqls) {
      const ast = parser.astify(sql, { database: 'MySQL' }) as Create[]
      const table = {
        table: ast[0].table ? ast[0].table[0].table : 'unknown',
        columns: ast[0].create_definitions
          ? ast[0].create_definitions.flatMap((prop) =>
              prop.column ? { property: prop.column.column as string, definition: prop.definition } : []
            )
          : []
      }

      const json = {
        required: table.columns?.map((prop) => prop.property),
        properties: this.properties(table.columns)
      }
      console.log(table.columns)
      const ymlText = YAML.stringify(json)
      console.log(ymlText)
    }
  }

  private properties(columns: { property: string; definition: any }[]) {
    const properties: { [id: string]: any } = {}
    for (const column of columns) {
      properties[column.property] = this.types(column.property, column.definition.dataType)
    }
    return properties
  }

  private types(property: string, type: string) {
    switch (type) {
      case 'VARCHAR':
        return { type: 'string', nullable: property === 'id' ? undefined : true }
      case 'TEXT':
        return { type: 'string', nullable: property === 'id' ? undefined : true }
      case 'CHAR':
        return { type: 'string', nullable: property === 'id' ? undefined : true }
      case 'LONGTEXT':
        return { type: 'string', nullable: property === 'id' ? undefined : true }
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

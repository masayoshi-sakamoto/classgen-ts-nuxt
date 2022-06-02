export interface IConfig {
  tables?: {
    excludes?: string[]
  }
  columns?: {
    excludes?: string[]
  }
  schemas?: {
    excludes?: string[]
  }
}

export interface IModel {
  table: string
  name: string
  refs: any
  schema: ITsSchema
  seed: boolean
}

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

export type ITsSchema = {
  key?: string
  tstype?: string
  title?: string
  properties?: ITsSchema
  ref?: boolean
  required?: boolean
  nullable?: boolean
  array?: boolean
  default?: any
  format?: string
}
export type IRef = {
  name: string
}

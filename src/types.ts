export interface IConfig {
  tables?: {
    excludes?: string[]
  }
  columns?: {
    excludes?: {
      index: string[]
      seed: string[]
    }
  }
  schemas?: {
    excludes?: string[]
  }
  menu?: {
    excludes?: string[]
  }
}

export const EmptyConfig = (prop?: Partial<IConfig> | null) => ({
  tables: { excludes: [] },
  columns: { excludes: { index: [], seed: [] } },
  schemas: { excludes: [] },
  menu: { excludes: [] },
  ...prop
})

export const swagger = {
  root: 'swagger',
  src: 'swagger/src',
  components: 'swagger/src/components',
  schemas: 'swagger/src/components/schemas',
  paths: 'swagger/src/paths'
}

export const app = {
  root: 'app',
  entities: 'app/entities',
  AppName: 'app/gateways',
  gateways: 'app/gateways/AppName',
  translator: 'app/gateways/AppName/translator',
  infrastructure: 'app/infrastructure',
  models: 'app/infrastructure/network/AppName/schema/models',
  plugins: 'app/plugins',
  store: 'app/store',
  repositories: 'app/repositories',
  types: 'app/types',
  usecases: 'app/usecases/class_name'
}

export const components = {
  root: 'app/components',
  assets: 'app/assets',
  molecules: 'app/components/molecules',
  organisms: 'app/components/organisms',
  Form: 'app/components/organisms/Form',
  templates: 'app/components/templates',
  pages: 'app/pages'
}

export const exts = ['css', 'html', 'json', 'scss', 'ts', 'vue', 'yaml']

export interface IModel {
  table: string
  ClassName: string
  refs?: any
  schema?: ITsSchema
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

export interface ISwagger {
  paths: {
    [key: string]: any
  }
  models: IModel[]
}

export interface IYAML {
  table: string // テーブル名
  class_name: string // クラス名
  index: string // 通常モデルのYAML文
  seed: string // StoreモデルのYAML文
  path: string // /{class_names}/{id} get put delete
  paths: string // /{class_names}/ fetch post
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
  schema: string
}

export interface IProperty {
  type: string
  format?: string
  title: string
  nullable?: boolean
  default: any
}

export interface IProperties {
  [id: string]: IProperty | { [$ref: string]: string }
}

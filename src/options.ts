export interface IGlobalOptions {
  namespace: string // アプリケーション名
  config: string // configファイル名
  sqldump?: string // SQLDUMPファイル
  dist: string // 出力先
  force?: boolean // 強制実行
}

export interface IInitializeOptions {
  admin?: boolean | string // 管理画面用フラグ
  auth?: string // 認証系の処理の追加
}

export interface IGenerateOptions {
  excludes?: string[] // schemaを生成時に除外したいカラム
  swagger?: boolean
  auth?: boolean
}

export type IOptions = {
  global: IGlobalOptions
} & IGenerateOptions

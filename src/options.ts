export interface IOptions {
  namespace: string // アプリケーション名
  force?: boolean // 強制実行
  remove?: boolean // 生成ではなく削除オプション
  sqldump?: string // SQLDUMPファイル
  dist: string // 出力先
}

export interface IInitializeOptions {
  admin?: boolean | string // 管理画面用フラグ
  auth?: string // 認証系の処理の追加
}

export interface ISchemaOptions {
  excludes?: string[] // schemaを生成時に除外したいカラム
  swagger?: boolean
  all?: boolean
}

export type TOptions = IOptions & ISchemaOptions

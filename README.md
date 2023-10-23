# 初期化手順

## initialize.shとgenerate.shの生成
```bash
$ yarn class-gen-sql init start
```

## schemaの作成
```bash
$ yarn class-gen-sql swg sql
```

## 初期生成ファイル
```bash
$ yarn class-gen-sql init all
$ yarn class-gen-sql gen index -f
```

## ユースケースの作成 
```bash
$ yarn class-gen-sql gen entities
$ yarn class-gen-sql gen usecases
$ yarn class-gen-sql gen gateways
$ yarn class-gen-sql gen repositories
$ yarn class-gen-sql gen index -f
```

## ユースケースの作成 通常テーブル
```bash
$ yarn class-gen-sql gen usecase Category -sw -a
```

## ページ作成用
```bash
$ yarn class-gen-sql com web
$ yarn class-gen-sql com auth
```


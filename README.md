# 初期化手順

## コンフィグファイル系の作成
```bash
$ yarn class-gen gen config
```

## アプリの初期化
```bash
$ yarn class-gen-sql gen initialize -sw
$ yarn class-gen-sql gen index -sw
```

## ユースケースの作成 ログインテーブル
```bash
$ yarn class-gen-sql gen usecase User -sw -a
$ yarn class-gen-sql gen auth User -sw
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


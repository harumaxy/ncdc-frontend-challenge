# NCDC フロントエンド課題

## 概要

バックエンドAPI と SPA の通信により、リモート保存可能な Web テキストエディター

## プロジェクト構成

pnpm ワークスペース機能を利用したモノレポ構成です。


- backend
  - 課題用の NestJS バックエンドAPI をクローンしたもの ([ncdcdev/recruit-frontend](https://github.com/ncdcdev/recruit-frontend/tree/main))
- frontend
  - React + Vite の SPA
- swagger
  - backend の swagger 仕様から Tanstack Query のコードを生成して、 frontend で使うためのパッケージ

## 使用ライブラリ・ツール等

- Vite
- React
- TailwindCSS
- Orval
- Tanstack Query
- Zustand
- Claude Code
- Playwright (E2Eテスト)

一部、生成AIを利用したモックアップを足がかりとして、細かい見た目や内部ロジックは手動で実装しました。

## 実行方法

以下のコマンドが使用できる前提: 
  
- node (v22.19.0)
- npm
- make

(自分の環境では動作していますが、環境要因での動作問題は各自ご対応お願いします)

```sh
make install-pnpm
make start

# E2E テストを実行する
make install-test-deps
make test
```


## 免責事項

`backend` フォルダーは pnpm ワークスペースに含めず個別に npm で依存をインストールしています。  
TypeORM あたりが pnpm と相性が悪く、実行時に依存関係が解決できないための措置です。

元々のプロジェクトの .node-version から v22.19.0 バージョンアップしています  
(フロントの依存関係上の問題)

レスポンシブ対応については必須でない加点要素とされていますが、デザインの提供がなかったことと、早く提出したほうが良いと考え未対応です。

フロントエンドで完結する or 多少のバックエンドであれば Cloudflare workers の静的アセット配信でデプロイして提出しようと思いましたが、Node.js バックエンドのデプロイが手間そうなのでローカルでの動作確認をお願いします。  
(その名残で frontend に wrangler 関連の設定ファイルが残っています)

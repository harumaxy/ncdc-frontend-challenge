# NCDC フロントエンド課題

## 概要



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

一部、生成AIを利用したモックアップを足がかりとして、細かい見た目や内部ロジックは手動で実装しました。

## 実行方法

前提: Node.js v22.19.0 及び npm が使用できる状態  
(自分の環境では動作していますが、環境要因での動作問題は各自ご対応お願いします)

```sh
make install-pnpm
make start
```


## 免責事項

一部、技術的問題のため理想でないプロジェクト構成になっています。  
NestJS, TypeORM あたりが pnpm と相性が悪く実行時に依存関係が解決できないので(requireによる動的インポートなどが原因？)、バックエンドのパッケージのみ pnpm ワークスペースに含めず個別に npm で依存をインストールしています。

元々のプロジェクトの .node-version から v22.19.0 バージョンアップしています  
(フロントの依存関係上の問題)

レスポンシブ対応については必須でない加点要素とされていますが、デザインが提供されていないこと、及び出来ている部分を早く提出したほうが良いと考えて未対応です。

フロントエンドで完結するかつ多少のバックエンドであれば、 Cloudflare workers にデプロイして Web で動作確認できるものを提出しようと思いましたが、Node.js バックエンドのデプロイが手間そうなのでローカルでの動作確認をお願いします。  
(その名残で frontend に wrangler 関連の設定ファイルが残っています)

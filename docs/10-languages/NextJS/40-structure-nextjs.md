---
id: structure-nextjs
title: ディレクトリ構成
sidebar_position: 40
tags: [nextjs]
---

# ディレクトリ構成

## 構成

:::info
App Router を利用して開発をする際のディレクトリ構成案をまとめる
:::

```plaintext
src
|
+-- app                        # Routing files（Next.jsが標準で提供するファイル）
|
+-- components                 # ドメインに依存しないUIコンポーネント
|
+-- features                   # 特定のドメインに関係するコンポーネントをまとめる
|   |
|   +-- <feature name>
|       |
|       +-- page               # containerを組み合わせてページを構成する
|       |
|       +-- <container name>
|           |
|           +-- container      # データフェッチしてPresentationalへ渡すことを責務とする
|           |
|           +-- presentational # containerから受け取ったデータをUIへ表示することを責務とする
|
+-- repositories               # データ操作に関する関数群（containerから利用）
|
+-- hooks                      # ドメインに依存しないhooks
|
+-- providers                  # アプリケーション全体に関わるプロバイダー
|
+-- helpers                    # ドメインに依存しない汎用関数
|
+-- constants                  # ドメインに依存しない定数
|
+-- types                      # ドメインに依存しない型定義
|
+-- styles                     # スタイリング（css）に関するファイル
|
+-- lib                        # ライブラリの処理や標準処理を共通化したコード
|
+-- tests                      # 自動テスト関連
```

## 参考

- [Next.js（App router）における開発しやすいディレクトリ構成の例](https://techblog.technology-doctor.com/entry/2024/09/12/172551)
- [Next.js の考え方 Container/Presentational パターン](https://zenn.dev/akfm/books/nextjs-basic-principle/viewer/part_2_container_presentational_pattern)

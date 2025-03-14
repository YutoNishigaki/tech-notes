---
slug: /testing/
id: role
title: テストの役割
sidebar_position: 1
tags: [test]
---

# テストの役割

:::note[概要]
テストの種類と役割を明確にし、実施すべきテストケースの定義を行う。
:::

## 優れたテストスイートとは？

- テストすることが開発サイクルの中に組み込まれている。
- コードベースの重要な部分のみがテスト対象となっている。
- 最小限の保守コストで最大限の価値を生み出すようになっている。

ロジックの中でも特にテストの効果が高いのはビジネスロジックとなる。  
この指針を守るためにドメインモデルを他の関心毎から分離しておくことが重要となる。

## 単体テストに対する考え方と二つの学派

|              | 実践 | 隔離対象     | 単体の意味                                 | テストダブルの置き換え対象 |
| :----------- | :--- | :----------- | :----------------------------------------- | :------------------------- |
| ロンドン学派 |      | 単体         | １つのクラス                               | 不変依存を除くすべての依存 |
| 古典学派     | ★    | テストケース | 同じ目的を達成するためのクラスの１グループ | 共有依存                   |

テストダブルの置き換え対象に挙げている不変依存と共有依存の定義

- 不変依存 : 値オブジェクトなどのイミュータブルな依存関係
- 共有依存 : ミュータブルな依存関係
  - プロセス外依存 : DB などの複数のクラスから依存が共有されるもの
  - プライベート依存 : シングルトンなどのコード内の複数のクラスから依存が共有されるもの

古典学派は、プロセス外依存のみをテストダブルに置き換える  
ロンドン学派は、プロセス外依存とプライベート依存をテストダブルに置き換える

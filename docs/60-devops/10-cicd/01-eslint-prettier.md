---
slug: /devops/
id: eslint-prettier
title: 静的解析とフォーマッター
sidebar_position: 1
tags: []
---

# ESLint + Prettier の導入

:::caution
ESLint にもコードフォーマット機能があるため、Prettier と併用する場合はルールが競合する問題がある
:::

そこで、`eslint-config-prettier` を利用すると良い  
ESLint のルールを Prettier でも引き継ぎ競合を防ぐことができる

```bash
npm install --save-dev prettier eslint-config-prettier
```

```javascript:.eslintrc
module.exports = {
  extends: [
    "prettier",
  ],
};

```

コード編集中のフォーマットをするために VSCode の設定を変更した方がよい

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode", // フォーマッターをPrettierにする
  "editor.formatOnSave": true // ファイル保存時にフォーマットを実行
}
```

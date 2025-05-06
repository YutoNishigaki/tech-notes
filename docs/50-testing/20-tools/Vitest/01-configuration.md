---
id: configuration
title: 設定
sidebar_position: 1
tags: [vitest]
---

# 設定

Vitest は `vitest.config.ts` または Vite の `vite.config.ts` でテスト環境をカスタマイズできる

```typescript:vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    include: ['src/**/*.{test,spec}.ts'],
    coverage: {
      reporter: ['text', 'html']
    }
  }
})
```

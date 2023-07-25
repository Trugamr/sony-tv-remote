import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'tsup',
  format: ['cjs', 'esm'],
  dts: true,
  entry: ['src/**/*.ts'],
  sourcemap: true,
  clean: true,
})

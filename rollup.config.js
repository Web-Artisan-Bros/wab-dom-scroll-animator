import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: `src/index.ts`,
    plugins: [esbuild(), nodeResolve()],
    output: [
      {
        file: `dist/index.cjs.js`,
        format: 'cjs',
        // sourcemap: true,
        exports: 'default'
      },
      {
        file: `dist/index.js`,
        format: 'es',
        // sourcemap: true,
        exports: 'default'
      },
      {
        file: `dist/index.umd.js`,
        name: 'WDSA',
        format: 'umd',
        // sourcemap: true,
        exports: 'default'
      },
      {
        file: `dist/index.iife.js`,
        name: 'WDSA',
        format: 'iife',
        // sourcemap: true,
        exports: 'default'
      }
    ]
  },
  {
    input: `src/index.ts`,
    plugins: [dts()],
    output: {
      file: `dist/index.d.ts`,
      format: 'es'
    }
  }
]

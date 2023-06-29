import typescript from '@rollup/plugin-typescript'
import versionInjector from 'rollup-plugin-version-injector'
import clear from 'rollup-plugin-clear'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import striptease from './plugins/striptease.mjs'

const preamble = `/* Bridge SDK provided by Arrow Health 2021-present. All rights reserved. */`

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      name: 'bridge',
      format: 'es',
      plugins: [
        terser({
          output: {
            beautify: true,
            preamble,
          },
        }),
      ],
    },
    {
      file: 'dist/bridge.js',
      name: 'bridge',
      format: 'umd',
      plugins: [
        terser({
          compress: false,
          mangle: false,
          output: {
            beautify: true,
            preamble,
          },
        }),
      ],
    },
    {
      file: 'dist/bridge.min.js',
      name: 'bridge',
      format: 'umd',
      sourcemap: true,
      plugins: [
        terser({
          output: {
            preamble,
          },
        }),
      ],
    },
  ],
  plugins: [
    clear({
      targets: ['dist'],
      watch: true,
    }),
    versionInjector({
      logLevel: 'warn'
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    filesize(),
    striptease()
  ],
}

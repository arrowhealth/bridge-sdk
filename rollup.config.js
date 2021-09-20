import typescript from '@rollup/plugin-typescript'
import clear from 'rollup-plugin-clear'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import { version } from './package.json'

const preamble = `/**
 * Bridge SDK v${version}
 * Arrow Health 2021. All rights reserved.
 */`

export default {
  input: 'src/bridge.ts',
  output: [
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
    typescript({ tsconfig: './tsconfig.json' }),
    filesize(),
  ],
}

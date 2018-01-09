import { camelCase } from 'lodash'
import * as fs from 'fs'
import * as path from 'path'
import babel from 'rollup-plugin-babel'
// import CleanCSS from 'clean-css'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import vue from 'rollup-plugin-vue'

let { name, dependencies } = require('../package.json')
const version = process.env.VERSION || require('../package.json').version
name = name.replace('@axelspringer/', '')

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

const externalExcludes = [
  'vue-apollo',
  'vue'
]

const banner =
  '/*!\n' +
  ' * Mango Vue v' + version + '\n' +
  ' * (c) 2017-' + new Date().getFullYear() + ' Axel Springer SE\n' +
  ' * Released under the MIT License.\n' +
  ' */'

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

module.exports = {
  input: path.resolve(src, 'main.ts'),
  watch: {
    useChokidar: false,
    exclude: ['node_modules/**']
  },
  external: Object.keys(dependencies).filter(dep => externalExcludes.indexOf(dep) === -1),
  plugins: [
    typescript(),
    vue({
      cssModules: {
        generateScopedName: '[name]__[local]'
      },
      // css(style) {
      //   fs.writeFileSync(path.resolve(dist, `${name}.css`), new CleanCSS().minify(style).styles)
      // }
    }),
    resolve({ external: ['vue'] }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  output: [
    {
      format: 'cjs',
      file: path.resolve(dist, name + '.common.js'),
      sourcemap: true,
      banner
    },
    {
      format: 'es',
      file: path.resolve(dist, name + '.esm.js'),
      sourcemap: true,
      banner
    },
    {
      format: 'umd',
      name: camelCase(name),
      file: path.resolve(dist, name + '.js'),
      sourcemap: true,
      banner
    },
  ]
}

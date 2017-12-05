/*** DO NOT TOUCH ***/
import { root } from './helpers'
import {
  DefinePlugin,
  ProgressPlugin
} from 'webpack'
import { CheckerPlugin } from 'awesome-typescript-loader'
import { TsConfigPathsPlugin } from 'awesome-typescript-loader'
import * as AutoDllPlugin from 'autodll-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
// import * as ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin'

// optimization
import * as BrotliPlugin from 'brotli-webpack-plugin'
import * as CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin'
import * as CompressionPlugin from 'compression-webpack-plugin'
import * as OptimizeJsPlugin from 'optimize-js-plugin'
import * as UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin'

// postCss
import * as Autoprefixer from 'autoprefixer'
import * as CssNano from 'cssnano'

// pws
// import * as OfflinePlugin from 'offline-plugin'
import * as ManifestPlugin from 'webpack-manifest-plugin'

// hot
import { HotModuleReplacementPlugin, NamedModulesPlugin } from 'webpack'

import { CustomCopyFolders } from './custom'

// copy
// export const DefaultCopyFolders = [
//   { from: 'src/static', ignore: ['favicon.ico'] },
//   { from: 'src/meta' }
// ]

// dll's
import { polyfills, vendor } from './dll'

export const loader: DefaultLoaders = {
  tsLintLoader: {
    enforce: 'pre',
    test: /\.ts?$/,
    use: [
      {
        loader: 'tslint-loader',
        options: {
          typeCheck: true
        }
      }
    ]
  },
  sourceMapLoader: {
    test: /\.js$/,
    use: 'source-map-loader'
  },
  tsLoader: {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          configFileName: 'tsconfig.es2015.json'
        }
      }
    ],
    exclude: [/\.(spec|e2e)\.ts$/]
  },
  vueLoader: {
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  cssLoader: {
    test: /\.css$/,
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoader: 1,
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            Autoprefixer(),
            CssNano()
          ]
        }
      }
    ],
    exclude: /boot\.css/
  },
  htmlLoader: {
    test: /\.html$/,
    use: 'raw-loader',
    exclude: [root('index.html')]
  },
  fileLoader: {
    test: /\.(jpg|png|gif)$/,
    use: 'file-loader'
  }
}

export const DefaultCommonConfig = (): DefaultConfig => {
  return {
    rules: [loader.cssLoader, loader.htmlLoader, loader.fileLoader],
    plugins: [
      new ProgressPlugin(),
      new CheckerPlugin(),
      new TsConfigPathsPlugin()
    ]
  }
}

export const DefaultDevConfig = ({ isDev }): DefaultConfig => {
  return {
    rules: [loader.tsLintLoader, loader.vueLoader, loader.tsLoader],
    plugins: [
      new AutoDllPlugin({
        context: __dirname,
        debug: true,
        inject: false, // will inject the DLL bundles to index.html
        filename: '[name].dll.js',
        entry: {
          polyfills: polyfills(),
          vendor: vendor()
        }
      }),
      new DefinePlugin({
        __DEV__: isDev,
        __PROD__: !isDev,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"client"'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: 'index.html',
      }),
      new NamedModulesPlugin(),
      new CopyWebpackPlugin([...CustomCopyFolders]),
      // new ScriptExtHtmlWebpackPlugin({
      //   defaultAttribute: 'defer'
      // }),
      new HotModuleReplacementPlugin(),
      new CommonsChunkPlugin({
        name: 'manifest'
      })
    ]
  }
}

export const DefaultProdConfig = ({ isDev }): DefaultConfig => {
  return {
    rules: [loader.tsLintLoader, loader.vueLoader, loader.tsLoader],
    plugins: [
      new DefinePlugin({
        __DEV__: isDev,
        __PROD__: !isDev,
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"client"'
      }),
      new OptimizeJsPlugin({
        sourceMap: false
      }),
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      // new NoEmitOnErrorsPlugin(), // quality
      // This enables tree shaking of the vendor modules
      new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules/.test(module.resource)
      }),
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),
      new CommonsChunkPlugin({
        name: 'manifest'
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 2 * 1024,
        minRatio: 0.8
      }),
      new CopyWebpackPlugin([...CustomCopyFolders]),
      new HtmlWebpackPlugin({
        template: './index.html',
        minify: {
          minifyJS: true,
          removeComments: true, // this is for ssr
          collapseWhitespace: true,
          ignoreCustomComments: [/vue-ssr-outlet/]
        }
      }),
      // new ScriptExtHtmlWebpackPlugin({
      //   sync: /polyfills|vendor/,
      //   defaultAttribute: 'async',
      //   preload: [/polyfills|vendor|main/],
      //   prefetch: [/chunk/]
      // }),
      new UglifyJsPlugin({
        beautify: false,
        output: {
          comments: false
        },
        compress: {
          comparisons: true,
          conditionals: true,
          dead_code: true,
          drop_console: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false, // we need this for lazy v8
          screw_ie8: true,
          sequences: true,
          unused: true,
          warnings: false
        },
        mangle: {
          screw_ie8: true
        }
      }),
      new ManifestPlugin(),
      // new OfflinePlugin({
      //   relativePaths: false,
      //   ServiceWorker: {
      //     events: true,
      //     navigateFallbackURL: '/'
      //   },
      //   AppCache: {
      //     events: true,
      //     FALLBACK: { '/': '/' }
      //   }
      // })
    ]
  }
}

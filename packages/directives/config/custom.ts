/**
 * Custom Configuration
 *
 * You can customize almost every crucial aspect of your setup here.
 *
 * - Common Configuration
 * - Dev Configuration
 * - Production Configuration
 * - Head Tags
 * - Folders
 * - Sourcemaps
 * - Dev Server Configuration
 *
 */
// import { root } from './helpers'

import * as Autoprefixer from 'autoprefixer'
import * as CssNano from 'cssnano'

import * as PreloadWebpackPlugin from 'preload-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
// import * as HtmlCriticalPlugin from 'html-critical-webpack-plugin'

const bootCss = new ExtractTextPlugin('boot.css')

// to copy folders
export const CustomCopyFolders = [

]

// common
export const CustomCommonConfig: CustomConfig = {
  plugins: [
    bootCss,
    new PreloadWebpackPlugin()
  ],
  rules: [
    {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    },
    {
      test: /boot\.css$/,
      use: ExtractTextPlugin.extract({
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                Autoprefixer(),
                CssNano()
              ]
            }
          }
        ]
      })
    }
  ]
}

// dev
export const CustomDevConfig: CustomConfig = {
  plugins: [

  ],
  rules: [

  ]
}

// production
export const CustomProdConfig: CustomConfig = {
  plugins: [
    // new HtmlCriticalPlugin({
    //   base: root(`public`),
    //   src: 'index.html',
    //   dest: 'index.html',
    //   inline: true,
    //   minify: false,
    //   extract: true,
    //   penthouse: {
    //     blockJSRequests: false,
    //   }
    // })
  ],
  rules: [

  ]
}

// webpack-dev-server
export const DevServerConfig = {
  options: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  port: 3000
}

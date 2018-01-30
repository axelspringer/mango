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

// import * as PreloadWebpackPlugin from 'preload-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
// import * as HtmlCriticalPlugin from 'html-critical-webpack-plugin'

const bootCss = new ExtractTextPlugin('boot.css')
const modulesCss = new ExtractTextPlugin('modules.css')

// to copy folders
export const CustomCopyFolders = [

]

// common
export const CustomCommonConfig = ({ isDev }): CustomConfig => {
  return {
    plugins: [
      bootCss,
      modulesCss
      // new PreloadWebpackPlugin()
    ],
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /boot\.scss$/,
        use: bootCss.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => isDev ? [Autoprefixer({
                  browsers: [
                    'last 3 version',
                    'ie >= 10' // supports IE from version 10 onwards
                  ]
                })] : [Autoprefixer(), CssNano()],
                sourceMap: isDev
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: modulesCss.extract({
          use: [
            // {
            //   loader: 'style-loader'
            // },
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
                plugins: () => isDev ? [Autoprefixer({
                  browsers: [
                    'last 3 version',
                    'ie >= 10' // supports IE from version 10 onwards
                  ]
                })] : [Autoprefixer(), CssNano()],
                sourceMap: isDev
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev
              }
            }
          ],
        }),
        exclude: /boot\.scss/
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name() {
                if (isDev) {
                  return '[path][name].[ext]'
                }

                return '[hash].[ext]'
              },
              outputPath: 'img/',
              publicPath: '/static/'
            }
          }
        ],
        exclude: /(\/fonts)/
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        use: [{
          loader: 'file-loader',
          options: {
            name() {
              if (isDev) {
                return '[path][name].[ext]'
              }

              return '[hash].[ext]'
            },
            outputPath: 'fonts/'
          }
        }],
        exclude: /(\/img)/
      }
    ]
  }
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

// ssr
export const CustomSSRConfig: CustomConfig = {
  plugins: [],
  rules: []
}

// head
export const CustomHeadTags: HeadTags = {
  link: [ // this will be mapted to a type of head elements (e.g. link)
    { rel: 'apple-touch-icon', sizes: '57x57', href: '/icon/apple-icon-57x57.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', href: '/icon/apple-icon-60x60.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: '/icon/apple-icon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/icon/apple-icon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: '/icon/apple-icon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/icon/apple-icon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: '/icon/apple-icon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/icon/apple-icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon/apple-icon-180x180.png' },

    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon/android-icon-192x192.png' },

    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icon/favicon-96x96.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icon/favicon-16x16.png' },

    { rel: 'manifest', href: '/manifest.json' },
  ],
  meta: [
    { name: 'msapplication-TileColor', content: '#00bcd4' },
    { name: 'msapplication-TileImage', content: '/icon/ms-icon-144x144.png', '=content': true },
    { name: 'theme-color', content: '#00bcd4' },
    { name: 'description', content: 'Media Impact' },
  ],
  title: 'Mango Demo'
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

import * as Path from 'path'
import * as express from 'express'

export const isProd = process.env.NODE_ENV === 'production'
export const resolve = file => Path.resolve(__dirname, file)
export const serve = (path, cache) => express.static(resolve(path), {
  // evalute times on prod
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

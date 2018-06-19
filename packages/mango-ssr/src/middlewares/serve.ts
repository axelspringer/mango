/**
 * Module dependencies
 */

import * as assert from 'assert'
import * as send from 'koa-send'
import * as path from 'path'
import * as fs from 'fs'
import { join } from 'upath'

/**
 * Serve static files from `rootDir`.
 *
 * Serves files from specified directory at specified path or from root.
 * Supports 'index' file.
 *
 * @param {Object} options
 * @return {Object} - {Function} serve
 * @api public
 */
export default function serve(opts) {
  assert(typeof opts.rootDir === 'string', 'rootDir must be specified (as a string)')

  const options = opts || {}
  options.root = path.resolve(options.rootDir || process.cwd())
  // const log = options.log || false

  return async (ctx, next) => {
    assert(ctx, 'koa context required')

    let stats

    const dir = ctx.path.replace(/^\/static/, '') // parse static
    const file = join(options.root, dir)

    try {
      stats = fs.lstatSync(file);
    }
    catch (e) {
      return next() // could not fetch any data
    }

    if (!stats.isFile()) {
      return next() // if there is no file
    }

    // skip if this is not a GET/HEAD request
    if (ctx.method !== 'HEAD' && ctx.method !== 'GET') {
      return next()
    }

    let sent

    /* In case of error from koa-send try to serve the default static file
     * eg. 404 error page or image that illustrates error
     */
    try {
      sent = await send(ctx, dir, options)
    } catch (e) {
      ctx.throw(500, e)
    }

    if (sent) {
      return
    }

    return next()
  }
}

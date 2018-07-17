import * as ms from 'ms'

export default (ctx, maxAge) => {
  if (maxAge === false) {
    ctx.set('Cache-Control', 'private, no-cache, no-store')
    return
  }

  if (typeof maxAge === 'string') {
    const tmp = ms(maxAge)
    if (tmp) maxAge = tmp
  }

  if (typeof maxAge === 'number') {
    maxAge = Math.round(maxAge / 1000)
    ctx.set('Cache-Control', `public, max-age=${maxAge}, stale-if-error=${maxAge * 5}`)
  } else if (typeof maxAge === 'string') {
    ctx.set('Cache-Control', maxAge)
  } else {
    throw new Error('invalid cache control value: ' + maxAge)
  }
}

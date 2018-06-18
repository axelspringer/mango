import * as URL from 'url-parse'

export class Headers {
  public static XForwardedHost = 'x-forwarded-host'
}

export default function error() {
  return async (ctx, next) => {
    const { url, header } = ctx
    const parsedUrl = new URL(url)
    const parsedHost = new URL('http://' + header.host)

    if (header['x-forwarded-proto'] === 'https'
      || parsedUrl.port === 443) {
      return next() // pass on if already on https
    }

    // if there is proxy in-between
    parsedUrl.set('hostname', header[Headers.XForwardedHost] || parsedHost.hostname)
    parsedUrl.set('port', parsedUrl.port || parsedHost.port || 443) // force to set to 443

    // force ssl
    parsedUrl.set('protocol', 'https:') // set to https

    // redirect
    ctx.redirect(parsedUrl.toString())
  }
}

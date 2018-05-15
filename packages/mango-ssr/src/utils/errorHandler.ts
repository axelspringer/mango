import { error } from '../helpers'

export default function (err) {
  if (err && err.code === 404) {
    this.res.status(404).end('404 | Page Not Found')
  } else {
    // Render Error Page or Redirect
    this.res.status(500).end('500 | Internal Server Error')
    error(`error during render : ${this.req.url}`)
    error(err)
  }
}

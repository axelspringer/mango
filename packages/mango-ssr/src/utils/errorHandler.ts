export default function (err) {
  if (err && err.code === 404) {
    this.res.status(404).end('404 | Page Not Found')
  } else {
    this.req.log.error(`error during render : ${this.req.url}`)
    this.req.log.error(err)
    this.res.status(500).end('500 | Internal Server Error')
  }
}

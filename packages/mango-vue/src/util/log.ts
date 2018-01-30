export function warn(msg: string, err?: Error): void {
  if (typeof console !== 'undefined') {
    console.warn('[mango] ' + msg)
    if (err) {
      console.warn(err.stack)
    }
  }
}

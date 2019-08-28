
interface Promise<T> {
  almost(r: T): Promise<T>
}

// do an almost on the promise catch
if (!Promise.prototype.almost) {
  Promise.almost = r => Promise.all(r.map(p => p.catch ? p.catch(e => e) : p))
}

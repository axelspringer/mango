import { log, error } from '../utils/log'
import { sha256 } from 'js-sha256'

let resolvedPromise

export const enqueuePostPromiseJob = typeof process === 'object' && typeof process.nextTick === 'function' ?
  function (fn) {
    if (!resolvedPromise) {
      resolvedPromise = Promise.resolve()
    }
    resolvedPromise.then(() => process.nextTick(fn))
  } :
  setImmediate || setTimeout

export class Job {
  public resolve
  public reject
  public key

  public promise = new Promise((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })

  constructor(public ctx, public url, public params = {}) {
    this.key = sha256(JSON.stringify({ url, params }))
  }

  public fetch() {
    return this.ctx.axios.get(this.url, { params: this.params })
      .then(res => this.resolve(res.data))
      .catch(() => this.reject(null))
  }
}

export default class Loader {
  public queue: Job[] = []
  public resolvedQ

  public addResolver(name, func) {
    this[name] = func.bind(this)
  }

  public async job(ctx, url, params = {}) {
    const job = new Job(ctx, url, params)
    const batch = this.queue.findIndex(el => el.key === job.key)

    if (batch === -1) {
      this.queue.push(job)
    }

    if (batch !== -1) {
      return this.queue[batch].promise
    }

    if (this.queue.length === 1) {
      enqueuePostPromiseJob(() => this.dispatch())
    }

    return job.promise
  }

  public dispatch() {
    let i = this.queue.length
    while (i--) {
      const job = this.queue.shift()
      job.fetch()
    }
  }
}

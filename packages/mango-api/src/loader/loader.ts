import { log, error } from '../utils/log'
import { sha256 } from 'js-sha256'
import enqueuePostPromiseJob from '../utils/enqueue'

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
      .catch(() => this.resolve(null))
  }
}

export default class Loader {
  public queue: Job[] = []
  public promise: Promise<any>

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
      enqueuePostPromiseJob(this.promise, () => this.dispatch())
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

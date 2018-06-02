import { log, error, warning, info } from './utils/log'

export class Log {
  public log = log // maps console.log

  public _error = error
  public _warning = warning
  public _info = info

  public error(err: string) {
    this.log(this._error(err))
  }

  public warning(warn: string) {
    this.log(this._warning(warn))
  }

  public info(info: string) {
    this.log(this._info(info))
  }
}

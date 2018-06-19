export interface WinstonMessage {
  level?: string
  message?: string
}

export class Level {
  public static EMERG = 'emerg'
  public static ALERT = 'alert'
  public static ERROR = 'error'
  public static WARNING = 'warning'
  public static NOTICE = 'notice'
  public static INFO = 'info'
  public static DEBUG = 'debug'
}

export class Message implements WinstonMessage {
  constructor(public level = Level.INFO, public message = '') { }
}

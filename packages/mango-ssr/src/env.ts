import * as process from 'process'

export type Development = 'development'
export type Production = 'production'
export type Runtime = Development | Production

export const {
  NODE_ENV,
  SSM_MANGO_CONFIG,
  SSM_MANGO_ENV,
  SSM_MANGO_PORT,
  SSM_MANGO_STATIC_PATH,
  SSM_MANGO_TIMEOUT,
  MANGO_CONFIG,
  MANGO_ENV,
  MANGO_PORT,
  MANGO_STATIC_PATH,
  MANGO_TIMEOUT
} = process.env

export default class Environment {
  public static Config = SSM_MANGO_CONFIG || MANGO_CONFIG
  public static Env = SSM_MANGO_ENV || MANGO_ENV || NODE_ENV || 'production'
  public static Port = SSM_MANGO_PORT || MANGO_PORT || 3000
  public static StaticPath = SSM_MANGO_STATIC_PATH || MANGO_STATIC_PATH
  public static Timeout = SSM_MANGO_TIMEOUT || MANGO_TIMEOUT

  public static Runtime() {
    return Environment.Env !== 'development' ? 'production' : 'development'
  }

  public static get Development() {
    return Environment.Env === 'development'
  }

  public static get Production() {
    return Environment.Env !== 'development'
  }
}

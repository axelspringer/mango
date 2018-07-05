import * as process from 'process'

export enum Env {
  Development = 'development',
  Production = 'production'
}

export type Development = Env.Development
export type Production = Env.Production
export type Runtime = Development | Production

export const {
  NODE_ENV,
  SSM_MANGO_CONFIG, // this sets the path for the config to use
  SSM_MANGO_ENV, // this sets the environment to use
  SSM_MANGO_PORT, // this sets the port to use
  SSM_MANGO_STATIC_PATH, // this sets the path to the static asses
  SSM_MANGO_TIMEOUT,
  MANGO_CONFIG,
  MANGO_ENV,
  MANGO_PORT,
  MANGO_STATIC_PATH,
  MANGO_TIMEOUT
} = process.env

export default class Environment {
  public static Config = SSM_MANGO_CONFIG || MANGO_CONFIG
  public static Env = SSM_MANGO_ENV || MANGO_ENV || NODE_ENV || Env.Production // do not risk anything
  public static Port = SSM_MANGO_PORT || MANGO_PORT || 3000
  public static StaticPath = SSM_MANGO_STATIC_PATH || MANGO_STATIC_PATH
  public static Timeout = SSM_MANGO_TIMEOUT || MANGO_TIMEOUT

  public static Runtime(): Runtime {
    return Environment.Env !== Env.Development ? Env.Production : Env.Development
  }

  public static get Development(): boolean {
    return Environment.Env === Env.Development
  }

  public static get Production(): boolean {
    return !Environment.Development
  }
}

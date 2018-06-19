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
  MANGO_ENV,
  SSM_MANGO_ENV, // this is for Templeton
} = process.env

export class Environment {

  public static Env = SSM_MANGO_ENV || MANGO_ENV || NODE_ENV || Env.Production // do not risk anything

  public static get Runtime(): Runtime {
    return Environment.Env !== Env.Development ? Env.Production : Env.Development
  }

  public static get Development(): Boolean {
    return Environment.Runtime !== Env.Production
  }

  public static get Production(): Boolean {
    return !Environment.Development
  }

}

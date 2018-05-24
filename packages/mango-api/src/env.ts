import * as process from 'process'

export type Development = 'development'
export type Production = 'production'
export type Runtime = Development | Production

export const {
  NODE_ENV,
  SSM_WP,
  SSM_ENV,
  SSM_PORT,
  SSM_PLUGINS,
  SSM_HOST,
  SSM_TOKEN,
  SSM_SECRET,
  MANGO_WP,
  MANGO_ENV,
  MANGO_PORT,
  MANGO_PLUGINS,
  MANGO_HOST,
  MANGO_TOKEN,
  MANGO_SECRET
} = process.env

export default class Environment {
  public static WP = SSM_WP || MANGO_WP || 'http://localhost:8181//wp-json'
  public static Env = SSM_ENV || MANGO_ENV || NODE_ENV || 'production'
  public static Port = SSM_PORT || MANGO_PORT || 8080
  public static Plugins = SSM_PLUGINS ? SSM_PLUGINS.split(',').map(plugin => plugin.trim()) : undefined || MANGO_PLUGINS ? MANGO_PLUGINS.split(',').map(plugin => plugin.trim()) : undefined || []
  public static Host = SSM_HOST || MANGO_HOST || 'localhost'
  public static Token = SSM_TOKEN || MANGO_TOKEN
  public static Secret = SSM_SECRET || MANGO_SECRET

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

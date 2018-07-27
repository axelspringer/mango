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
  SSM_MAX_AGE,
  SSM_TTL,
  MANGO_WP,
  MANGO_ENV,
  MANGO_PORT,
  MANGO_PLUGINS,
  MANGO_HOST,
  MANGO_TOKEN,
  MANGO_SECRET,
  MANGO_MAX_AGE,
  MANGO_TTL
} = process.env

export default class Environment {
  public static WP = SSM_WP || MANGO_WP || 'http://localhost:8181/wp-json'
  public static Env = SSM_ENV || MANGO_ENV || NODE_ENV || 'production'
  public static Port = SSM_PORT || MANGO_PORT || 8080
  public static Plugins = SSM_PLUGINS ? SSM_PLUGINS.split(',').map(plugin => plugin.trim()) : undefined || MANGO_PLUGINS ? MANGO_PLUGINS.split(',').map(plugin => plugin.trim()) : undefined || []
  public static Host = SSM_HOST || MANGO_HOST || 'localhost'
  public static Token = SSM_TOKEN || MANGO_TOKEN || 'top_secret'
  public static Secret = SSM_SECRET || MANGO_SECRET || 'top_secret'
  public static MaxAge = SSM_MAX_AGE ? parseInt(SSM_MAX_AGE) : MANGO_MAX_AGE ? parseInt(MANGO_MAX_AGE) : 60 * 1000
  public static TTL = SSM_TTL ? parseInt(SSM_TTL) : MANGO_TTL ? parseInt(MANGO_TTL) : 60 * 2

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

import * as process from 'process'

export const {
  SSM_MANGO_CONFIG,
  SSM_MANGO_DEV,
  SSM_MANGO_PORT,
  SSM_MANGO_STATIC_PATH,
  SSM_MANGO_TIMEOUT,
  MANGO_CONFIG,
  MANGO_DEV,
  MANGO_PORT,
  MANGO_STATIC_PATH,
  MANGO_TIMEOUT
} = process.env

export default class Env {
  public static Config = SSM_MANGO_CONFIG || MANGO_CONFIG
  public static Dev = SSM_MANGO_DEV || MANGO_DEV
  public static Port = SSM_MANGO_PORT || MANGO_PORT
  public static StaticPath = SSM_MANGO_STATIC_PATH || MANGO_STATIC_PATH
  public static Timeout = SSM_MANGO_STATIC_PATH || MANGO_STATIC_PATH
}

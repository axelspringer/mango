import { isProd } from './helpers'
import * as process from 'process'

export interface Config {
  bundle: string
  cache: boolean
  dev: boolean
  manifest: string
  maxAge: number
  port: number
  serve: string
  template: string
  webpack: string
}

export class SSRConfig implements Config {

  constructor(
    public serve,
    public bundle,
    public manifest,
    public template,
    public webpack,
    public dev = !isProd,
    public cache = true,
    public maxAge = isProd ? 60 * 60 * 24 * 30 : 0,
    public port = process.env.PORT || isProd ? 8080 : 3000,
  ) {
  }
}

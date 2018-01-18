import { parseArgs } from './args'
import { resolve } from './helpers'
import { SSRConfig } from './config'
import { SSR } from './main'
import * as path from 'path'
import * as process from 'process'

const args = parseArgs()

const serve = resolve(args.serve)
const bundle = resolve(args.bundle)
const manifest = resolve(args.manifest)
const template = resolve(args.template)
const webpack = resolve(args.webpack)

const config = new SSRConfig(serve, bundle, manifest, template, webpack)
const app = new SSR(config)
app.start()

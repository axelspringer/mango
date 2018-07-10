import { Config } from '@axelspringer/mango-config'
import { ServerSideRenderer } from './ssr'
import makeMap from './utils/makeMap'
import parseArgs from './args'
import SSRConfig from './config'
import * as memwatch from 'memwatch-next'

// send word of memory leak
memwatch.on('leak', (info) => {
  console.error('Memory leak detected:\n', info);
})


// config ssr
// let ssrConfig: Config

// parse arguments
const args = parseArgs()
const config = new Config(args)
const ssr = new SSRConfig(config.config)

// init new server-side renderer
const app = new ServerSideRenderer(ssr)
app.start()

export {
  makeMap
}

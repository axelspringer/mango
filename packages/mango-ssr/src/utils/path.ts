import * as path from 'path'
import * as process from 'process'

export const resolve = file => path.resolve(process.cwd(), file)
export const relative = (__dirname, file) => path.relative(__dirname, file)

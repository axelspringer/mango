import * as path from 'path'
import * as process from 'process'

export const resolve = file => !file ? file : path.resolve(process.cwd(), file)
export const relative = file => !file ? file : path.relative(__dirname, file)

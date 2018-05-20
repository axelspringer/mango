import * as path from 'path'
import * as process from 'process'

export const resolve = file => !file ? file : path.resolve(process.cwd(), file)
export const relative = (file, dirname = __dirname) => !file ? file : path.relative(dirname, file)

import * as process from 'process'

export const isProd = process.env.NODE_ENV === 'production'

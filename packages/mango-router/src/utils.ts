export const isDev = process.env.NODE_ENV !== 'production'
export const isProd = !isDev

export function assert(condition: any, message: string) {
  if (!condition) {
    throw new Error(`[pagemanager] ${message}`)
  }
}

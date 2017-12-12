// new repsonse
export class Response {
  constructor(public status, public data, public config, public headers, public statusText) {
  }
}

// match urls
export type UrlMatch = string
export const AnyRequest: UrlMatch = '*'

export class HttpMethods {
  public static GET = 'get'
  public static POST = 'post'
  public static OPTIONS = 'options'
  public static HEAD = 'HEAD'
  public static DELETE = 'DELETE'
  public static PUT = 'put'
}

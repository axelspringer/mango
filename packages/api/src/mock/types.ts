export class Response {
  constructor(public status, public data, public config, public headers, public statusText) {
  }
}

export class HTTP {
  public static GET = 'get'
  public static ANY = 'any'
}

export class Development {
  public static Port = 3000
  public static Timeout = 10 * 1000
  public static StaticPath = '/static'
}

export class Production {
  public static Port = 8080
  public static Timeout = 10 * 1000
  public static StaticPath = Development.StaticPath
}

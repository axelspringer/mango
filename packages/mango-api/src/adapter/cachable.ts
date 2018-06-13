export default class Cachable {

  constructor(
    public data,
    public timestamp = Date.now()
  ) {

  }
}

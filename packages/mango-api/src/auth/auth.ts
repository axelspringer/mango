import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'

export default class Auth {
  public token = null

  constructor(public secret, req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
      // Handle token presented as a Bearer token in the Authorization header
      this.token = req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
      // Handle token presented as URI param
      this.token = req.query.token
    } else if (req.cookies && req.cookies.token) {
      // Handle token presented as a cookie parameter
      this.token = req.cookies.token
    }

    // in all other cases use token null
  }

  public verify() {
    const verify = promisify(jwt.verify)
    return verify(this.token, this.secret)
      .then(dec => dec)
  }
}

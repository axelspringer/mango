export class AccessDenied extends Error {
  code = 404;
  message = this.message ||
    'Not authorized'
}

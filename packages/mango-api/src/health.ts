export const OK = 'OK'

export default (ctx, _) => {
  ctx.body = OK
  ctx.status = 200
}

export default function (ctx, headers) {
  for (const header in headers) { // set headers for res
    if (headers.hasOwnProperty(header)) {
      ctx.set(header, headers[header])
    }
  }
}

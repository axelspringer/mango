import { Renderer } from 'vue-server-renderer/types'

export default function (renderer: Renderer, render: Function, ctx: Object) {
  return new Promise(async (resolve) => {
    const cmp = typeof render === 'function' ? await render(ctx) : render
    resolve(renderer.renderToString(cmp, ctx) as any)
  })
}

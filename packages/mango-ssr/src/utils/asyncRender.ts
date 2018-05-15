import { Renderer } from 'vue-server-renderer/types'

export default function (renderer: Renderer, render: Function, ctx: Object) {
  return new Promise((resolve) => {
    const cmp = typeof render === 'function' ? render() : render

    resolve(renderer.renderToString(cmp, ctx) as any)
  })
}

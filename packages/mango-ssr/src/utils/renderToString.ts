import asyncRender from './asyncRender'
import { Renderer } from 'vue-server-renderer/types'
import { template } from 'lodash'

export default function (renderer: Renderer, render: any, renderTemplate: any, ctx: {}): Promise<any> {
  const compiled = template(renderTemplate)

  return Promise.all([...Object.keys(render).map(key => asyncRender(renderer, render[key], ctx))])
    .then(rendered => compiled(Object.keys(render).reduce((context, key, index) => {
      context[key] = rendered[index]
      return context
    }, {})))
}

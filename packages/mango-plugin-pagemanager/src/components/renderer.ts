// import _Vue from 'Vue'
// import { Component } from 'vue-property-decorator'
// import { __decorate } from 'tslib'

export default {
  name: 'pagemanager-renderer',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    blocks: {
      type: [Array, Object]
    }
  },

  render(_, { props, data, _children, parent }) {
    // directly use parent context's createElement() function
    // so that components rendered by pagemanager-renderer can resolve named slots
    const h = parent.$createElement
    const pagemanager = parent.$pagemanager
    const options = pagemanager.options

    let children = []

    if (props.blocks && Array.isArray(props.blocks)) {
      children = props.blocks.map((block) => {
        const cmp = options.blocks.find(b => b.pageBlock === block['page_block'])

        if (cmp === undefined) {
          return null
        }

        const newCmp = cmp.component
        const vnode = h(newCmp)
        const newNode = vnode
        const Ctor = newNode.componentOptions.Ctor
        Ctor.options.pageBlocks = Ctor.options.pageBlocks || {}
        Ctor.options.pageBlocks[block['page_block']] = Ctor.options.pageBlocks[block['page_block']] || []
        Ctor.options.pageBlocks[block['page_block']].push(block)

        return newNode
      })
    }

    // render component
    return h(props.tag, data, children)
  }
}

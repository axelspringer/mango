export default {
  name: 'pagemanager-renderer',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    blocks: {
      type: [Array, Object]
    }
  },

  render() {

    // directly use parent context's createElement() function
    // so that components rendered by pagemanager-renderer can resolve named slots
    const h = this.$parent.$createElement
    const pagemanager = this.$parent.$pagemanager
    const options = pagemanager.options

    let children = []

    if (this.blocks && Array.isArray(this.blocks)) {
      children = this.blocks.map((block) => {
        const cmp = options.blocks.find(b => b.pageBlock === block.page_block)

        if (cmp === undefined) {
          return null
        }

        const newCmp = cmp.component
        const vnode = h(newCmp)
        const newNode = vnode
        const Ctor = newNode.componentOptions.Ctor
        Ctor.cid = ++Ctor.cid
        Ctor.options.pageBlocks = Ctor.options.pageBlocks || {}
        Ctor.options.pageBlocks[block.page_block] = Ctor.options.pageBlocks[block.page_block] || []
        Ctor.options.pageBlocks[block.page_block].push(block.result)

        return newNode
      })
    }

    // render component
    return h(this.tag, {}, children)
  }
}

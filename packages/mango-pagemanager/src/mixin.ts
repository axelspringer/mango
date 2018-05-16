import PageManager from './index'

export default function (Vue) {
  return {
    beforeCreate(): void {
      const options: any = this.$options
      options.pagemanager = options.pagemanager || (options._pagemanager ? {} : null)

      if (options.pageBlocks
        && options.parent
        && options.parent.$pagemanager
        && options.parent.$pagemanager instanceof PageManager) { /* Ok, this is foo ;-) */
        const pagemanager = options.parent.$pagemanager
        const cmp = this.$vnode.componentOptions.Ctor.name
        const block = pagemanager.options.blocks.find(function (b) { return b.component.name === cmp })

        if (block !== undefined) {
          const mapBlock = options.pageBlocks[block.pageBlock]
          Vue.util.defineReactive(this, '_pageblock', mapBlock !== undefined ? mapBlock.shift() : [])
        }
      }

      // map pagemanager options
      if (options.pagemanager && options.pagemanager instanceof PageManager) {
        // map to chain
        this._pagemanager = options.pagemanager
        this._pagemanager.init(this)
      } else if (this.$root && this.$root.$pagemanager && this.$root.$pagemanager instanceof PageManager) {
        this._pagemanager = this.$root.$pagemanager
      } else if (options.parent && options.parent.$pagemanager && options.parent.$pagemanager instanceof PageManager) {
        this._pagemanager = options.parent.$pagemanager
      }
    },

    beforeDestroy(): void {
      if (!this._pagemanager) { return }

      this._pagemanager = null
      this._pageblock = null
    }
  }
}

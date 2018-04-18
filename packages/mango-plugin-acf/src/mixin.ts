//import ACF from './index'

export default function () {
  return {
    beforeCreate(): void {
      /* const options: any = this.$options
       options.pagemanager = options.pagemanager || (options.__pagemanager ? {} : null)

       if (options.pageBlocks
         && options.parent
         && options.parent.$pagemanager
         && options.parent.$pagemanager instanceof PageManager) { /* Ok, this is foo ;-) */
      /*  const pagemanager = options.parent.$pagemanager
        const cmp = this.$vnode.componentOptions.Ctor.name
        const block = pagemanager.options.blocks.find(b => b.component.name === cmp)

        if (block !== undefined) {
          Vue.util.defineReactive(this, '_pageblock', options.pageBlocks[block.pageBlock].shift())
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
      }*/
    },

    created(): void {
      // noop
    },
    /*
        beforeDestroy(): void {
          if (!this._pagemanager) { return }

          this._pagemanager = null
          this._pageblock = null
        }*/
  }

}

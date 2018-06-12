import inBrowser from '../../utils/dom'

function getTealium(vm) {
  // components can simply provide a `title` option
  // which can be either a string or a function
  const { tealium } = vm
  if (tealium) {
    return typeof tealium === 'function'
      ? tealium.call(vm)
      : tealium
  }
}

const serverTealiumMixin = {
  created() {
    const tealium = getTealium(this)
    if (this.$ssrContext) {
      this.$ssrContext.tealium = tealium || '' // always set context
    }
  }
}

const clientTealiumMixin = {
  mounted() {
    const tealium = getTealium(this)
    if (tealium) {
      document.tealium = tealium
    }
  }
}

// export for server and client
export default inBrowser && process.env.VUE_ENV !== 'server'
  ? clientTealiumMixin
  : serverTealiumMixin

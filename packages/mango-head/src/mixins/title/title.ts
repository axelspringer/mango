import inBrowser from '../../utils/dom'

function getTitle(vm) {
  // components can simply provide a `title` option
  // which can be either a string or a function
  const { title } = vm
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

const serverTitleMixin = {
  created() {
    const title = getTitle(this)
    if (this.$ssrContext) {
      this.$ssrContext.title = title || '' // always set context
    }
  }
}

const clientTitleMixin = {
  mounted() {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  }
}

// export for server and client
export default inBrowser && process.env.VUE_ENV !== 'server'
  ? clientTitleMixin
  : serverTitleMixin

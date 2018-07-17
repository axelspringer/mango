import inBrowser from '../../utils/dom'

const serverDefaultMixin = {
  created() {
    if (this.$ssrContext) {
      this.$ssrContext.tags = this.$ssrContext.tags || ''
    }
  }
}

// export for server and
export default !(inBrowser && process.env.VUE_ENV !== 'server')
  ? serverDefaultMixin
  : {}

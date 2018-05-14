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
    if (title) {
      this.$ssrContext.title = title
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

// `VUE_ENV` can be injected with `webpack.DefinePlugin`
export default !inBrowser || process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin

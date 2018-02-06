export const MangoHome = {
  name: 'MangoHome',
  functional: true,
  props: {

  },
  render(_, { _props, children, parent, data }) {

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    const h = parent.$createElement
    return h('div', data, children)
  }
}

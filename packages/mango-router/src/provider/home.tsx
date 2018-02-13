export default {
  functional: true,
  render: function (createElement, { children }) {
    return createElement(
      'div',   // tag name
      children // array of children
    )
  },
}

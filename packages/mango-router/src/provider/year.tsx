export default {
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  render: function (_, context) {
    const createElement = context.parent.$createElement
    return createElement(
      context.props.tag,   // tag name
      context.data,
      context.children // array of children
    )
  },
}

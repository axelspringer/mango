import template from './template'
import rss from './rss'

export default ({ route }) => {
  return {
    route,
    template,
    render: {
      rss
    },
    header: {
      'Content-Type': 'text/xml'
    }
  }
}


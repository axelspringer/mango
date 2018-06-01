const Vue = require('vue')

const rss = new Vue({
  template: `
    <channel>
      <title>Test</title>
    </channel>
  </rss>
  `,
  render: function (createElement) {
    throw new Error("test")
    return createElement(
      'h' + this.level, // tag name
      this.$slots.default // array of children
    )
  },
})

const rss2 = new Vue({
  template: `
    <channel>
      <title>Test</title>
    </channel>
  </rss>
  `,
  render: function (createElement) {
    return createElement(
      'h' + this.level, // tag name
      this.$slots.default // array of children
    )
  },
})

module.exports = {
  serve: 'public',
  plugins: [{
      route: '/test',
      template: `<?xml version="1.0" encoding="utf-8" ?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/"><%= rss %></rss>`,
      headers: {
        'Content-Type': 'text/xml'
      },
      context: {
        rss
      }
    },
    {
      route: '/test2',
      template: `<?xml version="1.0" encoding="utf-8" ?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/"><%= rss %></rss>`,
      headers: {
        'Content-Type': 'text/xml'
      },
      context: {
        rss: rss2
      }
    }
  ]
}

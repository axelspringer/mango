const Vue = require('vue')
const {
  makeMap
} = require('../dist/server')

const rssData = {
  title: 'Test Feed',
  link: 'www.test.com',
  desc: 'A test rss feed',
  items: [{
      title: 'Test number 1',
      link: 'www.test.com/1',
      desc: 'The first test',
      author: 'Test Bro',
    },
    {
      title: 'Test number 2',
      link: 'www.test.com/2',
      desc: 'The second test',
      author: 'Fred',
    },
    {
      title: 'Test number 3',
      link: 'www.test.com/3',
      desc: 'The last test',
      author: 'Anne',
    },
  ],
}

const rss = new Vue({
  template: `
    <channel>
      <title>Test</title>
    </channel>
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
    <title>{{title}}</title>
    <link>{{title}}</link>
    <description>{{desc}}</description>
  </channel>
  `,
  data: rssData
})

const isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'meta,param,source,track,wbr'
)

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
      },
      isUnaryTag,
    },
    {
      route: '/test2',
      template: `<?xml version="1.0" encoding="utf-8" ?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/"><%= rss %></rss>`,
      headers: {
        'Content-Type': 'text/xml'
      },
      context: {
        rss: rss2
      },
      isUnaryTag,
    }
  ]
}

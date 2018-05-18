const Vue = require('vue')

const template = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><%= rss %></rss>`
const data = {
  title: 'Test Feed',
  desc: 'A test rss feed',
  items: [{
    title: 'Test Article',
    desc: 'Test Article Description',
    author: 'Axel Springer',
  }],
};

const rss = function () {
  return new Vue({
    template: `
      <channel>
        <title>{{title}}</title>
        <description>{{desc}}</description>
        <item v-for="item in items">
          <title>{{item.title}}</title>
          <description>{{item.desc}}</description>
          <author>{{item.author}}</author>
        </item>
      </channel>
    `,
    data
  })
}

module.exports = {
  plugins: [{
    route: '/rss',
    template,
    render: {
      rss
    },
    header: {
      'Content-Type': 'text/xml'
    }
  }]
}

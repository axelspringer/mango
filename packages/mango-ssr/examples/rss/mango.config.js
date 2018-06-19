const RSSPlugin = require('@axelspringer/mango-plugin-rss')

module.exports = {
  plugins: [RSSPlugin({
    route: '/rss'
  })]
}

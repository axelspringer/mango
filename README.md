# :smiley_cat: Mango
[![Build Status](https://travis-ci.org/axelspringer/mango.svg?branch=master)](https://travis-ci.org/axelspringer/mango.svg?branch=master)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Taylor Swift](https://img.shields.io/badge/secured%20by-taylor%20swift-brightgreen.svg)](https://twitter.com/SwiftOnSecurity)
[![Volkswagen](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)

A modern pluggable WordPress delivery architecture. With GraphQL, SSR, and OAuth.

## Mono Repo

Mango is setup as a mono repo with [Lerna](https://github.com/lerna/lerna), encompassing all the packages for running WordPress with GraphQL and Vue.js.

Packages:

* [API](https://github.com/axelspringer/mango/tree/master/packages/mango-api#README)
* [SSR](https://github.com/axelspringer/mango/tree/master/packages/mango-ssr#README)
* [Vue](https://github.com/axelspringer/mango/tree/master/packages/mango-vue#README)
* [Page Manager](https://github.com/axelspringer/mango/tree/master/packages/mango-plugin-pagemanager#README)
* [Navigation](https://github.com/axelspringer/mango/tree/master/packages/mango-plugin-navigation#README)

## Development

The API and the components are highly integrated. You will thus need the gateway to develop the components. Therefore you can harvest the power of [lerna](https://lernajs.io/).

> also you should use the [WP Mango](https://github.com/axelspringer/wp-mango) plugin to authenticate protected endpoints in your [WP REST API](http://v2.wp-api.org/)

```
lerna bootstrap
```

## License
[MIT](/LICENSE)
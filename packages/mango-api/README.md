# :smiley_cat: Mango API

<br/>

[![Taylor Swift](https://img.shields.io/badge/secured%20by-taylor%20swift-brightgreen.svg)](https://twitter.com/SwiftOnSecurity)
[![Volkswagen](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)
[![TypeScript](https://badges.frapsoft.com/typescript/awesome/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Getting Started

> requires a `node` version >= 6 and an `npm` version >= 3.x.x

> we use [Koa](https://github.com/koajs/koa) as middleware

> we do provide a `help` command to display all possible arguments

```bash
# Installs the Mango API
npm i @axelspringer/mango-api -g

# Starts the Mango API in Mock modus
mango-api -d
```

## Arguments

> most command line arguments have a reflection in environment variables, which allows it to be easily tested and developed in many environments

### `help`

Displays all the available arguments

### `-wp` `MANGO_WP` (string)

Sets the url to the [WordPress REST](https://developer.wordpress.org/rest-api/) endpoint (e.g. http://localhost/wp-json/)

### `-m` `MANGO_MOCK` (boolean)

Enables the Mocks of the Mango API. 

### `-p` `MANGO_PORT` (string)

Sets the port of the Mango API.

### `-h` `MANGO_HOST` (string)

Sets the host of the Mango API.

### `-t` `MANGO_TOKEN` (string)

Sets the `X-MANGO-TOKEN` to the value provided by [WP Mango](https://github.com/axelspringer/wp-mango).

### `-s` `MANGO_SECRET` (string)

Sets the `X-MANGO-SECRET` to the value provided by [WP Mango](https://github.com/axelspringer/wp-mango).

### `-a` `MANGO_MOCK_ADAPTER` (string)

Uses a differen adapter for the mock data. This should implement and overload.

### `--plugin` `MANGO_PLUGINS` (string)

Loads an installed plugin (e.g. mango-plugin-pagemanager). If used multiple times, it loads multiple plugins. `MANGO_PLUGINS` should be used as follows `export MANGO_PLUGINS='pagemanager,navigation'`.

```javascript
const api = require('@axelspringer/mango-api');

function mocks(axios, config) {
  let adapter = new api.MockAdapter(axios, config);
  adapter.get(api.WP.Posts, require('./data/posts.json')).reply(200);
  adapter.get(api.WP.Users, require('./data/users.json')).reply(200);
  adapter.get(api.WP.NavLocations, require('./data/navLocations.json'), true).reply(200);
  adapter.get(api.WP.NavLocations + '/', require('./data/navLocations.json')).reply(200);
  adapter.get(api.WP.NavMenu, require('./data/navMenus.json')).reply(200);
  adapter.get(api.WP.NavItems, require('./data/navItems.json')).reply(200);
  adapter.get(api.WP.Settings, require('./data/settings.json')).reply(200);
}

exports.default = mocks
```

## Development

> all commands can be seen via `npm run help`

```bash
# Clone the repository
git clone https://github.com/axelspringer/mango

# enter directory
cd mango/packages/api

# Start the local dev server
npm start

# To use your local version for development of other mango parts, run
npm link
```

Have fun!

## License
[MIT](/LICENSE)

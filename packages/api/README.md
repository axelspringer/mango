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

> most command line arguments have a reflection in environment variables

### `MANGO_WP` (string)

Sets the url to the [WordPress REST](https://developer.wordpress.org/rest-api/) endpoint (e.g. http://localhost/wp-json/)

### `MANGO_MOCK` (boolean)

Enables the Mocks of the Mango API. 

### `MANGO_PORT` (string)

Sets the port of the Mango API.

### `MANGO_HOST` (string)

Sets the host of the Mango API.

## Development

> all commands can be seen via `npm run help`

```bash
# Clone the repository
git clone https://github.com/axelspringer/mango

# enter directory
cd mango/packages/api

# Start the local dev server
npm start
```

## Docker

You can also run Mango API in a Container. The middleware is exposed on `8080`.

```bash
# Build the container
npm run build/docker
```

Have fun!

## License
[MIT](/LICENSE)

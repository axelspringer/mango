# :smiley_cat: Mango SSR

<br/>

[![Taylor Swift](https://img.shields.io/badge/secured%20by-taylor%20swift-brightgreen.svg)](https://twitter.com/SwiftOnSecurity)
[![Volkswagen](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)
[![TypeScript](https://badges.frapsoft.com/typescript/awesome/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Getting Started

> requires a `node` version >= 6 and an `npm` version >= 3.x.x

> we do provide a `help` command to display all possible arguments

```bash
# Installs the Mango API
npm i @axelspringer/mango-ssr -g

# Starts the Mango API in Mock modus
mango-ssr --serve public --bundle public/vue-ssr-server-bundle.json -m public/vue-ssr-client-manifest.json -t public/index.html -w config/configs
```

## Config File

You can use a `mango.config.js` file to configure the server-side-renderer. This config file contains all the available command line arguments. There is an example file in `examples`.

```js
module.exports = {
  serve: 'public/',
  bundle: 'public/vue-ssr-server-bundle.json',
  manifest: 'public/vue-ssr-client-manifest.json',
  template: 'public/index.html',
  webpack: 'config/configs'
}
```

## Arguments

> most command line arguments have a reflection in environment variables, which allows it to be easily tested and developed in many environments

### `help`

Displays all the available arguments

### `-c` `--config` `MANGO_CONFIG` (string)

Provides the path to a `mango.config.js` file.

### `-s` `--serve` `MANGO_SERVE` (string)

Sets the path to the folder of the static assets.

### `-b` `--bundle` `MANGO_BUNDLE` (boolean)

Passes in the `vue-ssr-server-bundle.json`.

### `-m` `--manifest` `MANGO_PORT` (string)

Passes in the `vue-ssr-client-manifest.json`.

### `-t` `--template` `MANGO_TEMPLATE` (string)

Passes in the `index.html` as the template.

### `-w` `--webpack` `MANGO_WEBPACK` (string)

Passes in the Webpack config to use.

## Development

> all commands can be seen via `npm run help`

```bash
# Clone the repository
git clone https://github.com/axelspringer/mango

# Enter directory
cd mango/packages/ssr

# Start the local dev server
npm start

# To use your local version for development of other mango parts, run
npm link
```

Have fun!

## License
[MIT](/LICENSE)

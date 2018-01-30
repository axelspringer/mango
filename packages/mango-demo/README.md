# Media Impact
[![Taylor Swift](https://img.shields.io/badge/secured%20by-taylor%20swift-brightgreen.svg)](https://twitter.com/SwiftOnSecurity)
[![Volkswagen](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)

> This is the 🖌️ of [mediaimpact.de](http://www.mediaimpact.de)
> The rebrush is based on [vue-preboot](https://github.com/katallaxie/vue-preboot) and [mango](https://github.com/axelspringer/mango)

## Technology Stack

> ⚠️ This is a highly optionated stack, but inline with the [tortuga-techradar](https://axelspringer.github.io/tortuga-techrada)

* [SSR](https://ssr.vuejs.org) + Hot Module Reload
* [Webpack](http://webpack.github.io/) + DLL Support
* [Express](https://github.com/expressjs/express)
* [TypeScript](http://www.typescriptlang.org/)
* [@types](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&cad=rja&uact=8&ved=0ahUKEwjgjdrR7u_NAhUQ7GMKHXgpC4EQFggnMAI&url=https%3A%2F%2Fwww.npmjs.com%2F~types&usg=AFQjCNG2PFhwEo88JKo12mrw_4d0w1oNiA&sig2=N69zbO0yN8ET7v4KVCUOKA)
* [TsLint](http://palantir.github.io/tslint/)
* [Bundlesize](https://github.com/siddharthkp/bundlesize)
* [PostCss](https://github.com/postcss/postcss) + [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Jest](https://facebook.github.io/jest)
* [Docker](https://docker.io)
* [Prettier](https://github.com/prettier/prettier)
* [TypeStyle](https://github.com/typestyle/typestyle)
* [Vuex](https://github.com/vuejs/vuex)
* [Vue Router](https://github.com/vuejs/vue-router)
* Offline Support (PWA)

We use [Mango](https://github.com/axelspringer/mango) as a core technology for this WordPress site.

## Quick Start

> We support `node` >= 6.9.1, `npm` >= 3.x` [Yarn](https://yarnpkg.com), but highly recommend `npm`
> We recommend and support [Visual Studio Code](https://code.visualstudio.com/)
> We recommend to use [NVM](https://github.com/creationix/nvm) to manage your Node.js versions and dependencies
> You can run `npm run help` to see all available scripts

```
# clone the repo
git clone https://github.com/axelspringer/mediaimpact.de.git

# change to repo folder
cd mediaimpact.de

# install mango api
npm i @axelspringer/mango-api -g

# install the repo with npm
npm i

# start the express server + hmr
mango-api -m && npm start
```

Open [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your favorite Browser. [GraphiQL](https://github.com/graphql/graphiql) run at [http://localhost:8080](http://localhost:8080).

### Build and run the SSR

```bash
# builds the prod version of the client and the needed SSR bundle
npm run build

# runs the server and server-side-rendering app
npm run server
```

### Testing is import for quality products

> We have [Jest](https://facebook.github.io/jest) and [Protractor](http://www.protractortest.org/) in place

```bash
# run your unit tests
npm run tests

# or develop with unit tests in the loop
npm run watch:test
```

# :smiley_cat: Mango Router

<br/>

[![Taylor Swift](https://img.shields.io/badge/secured%20by-taylor%20swift-brightgreen.svg)](https://twitter.com/SwiftOnSecurity)
[![Volkswagen](https://auchenberg.github.io/volkswagen/volkswargen_ci.svg?v=1)](https://github.com/auchenberg/volkswagen)
[![TypeScript](https://badges.frapsoft.com/typescript/awesome/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Getting Started

> requires a `node` version >= 6 and an `npm` version >= 3.x.x

> we do provide a `help` command to display all possible arguments

```bash
# Install the base package and the plugin (could also be global -g)
npm i @axelspringer/mango-router
```

## Usage

Create a `router.ts` file with the following content.

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import { Home } from '../components/home'
import { Post } from '../components/post'
import MangoRouter from '@axelspringer/mango-router'

MangoRouter // build the route
  .home(Home)
  .post(Post)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: MangoRouter.all()
})

```

This configures the `vue-router` under the hood to match `/` to the `Home` component and `/:post` to the `Post` component. The partial paths of the route are constructed by chaining the routes.

## License
[MIT](/LICENSE)

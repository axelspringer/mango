# :smiley_cat: Mango Page Manager Plugin

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
npm i @axelspringer/mango-api @axelspringer/mango-plugin-pagemanager
```

## Installation

Try to install this package before rendering.

```bash
npm i @axelspringer/mango-api @axelspringer/mango-plugin-pagemanager
```

In you app, use the plugin and configure it. Use an extra file `pagemanager.ts` for it.

```javascript
import Vue from 'vue'
import PageManager from '@axelspringer/mango-plugin-pagemanager'
import { SelectedArticles } from '../components/selectedArticles'

// inject mango
Vue.use(PageManager)

export default new PageManager({
  blocks: [
    {
      pageBlock: 'selected_articles',
      component: SelectedArticles
    }
  ]
})
```

Then install it in your vue app options.

```javascript
import Vue from 'vue'
import pagemanager 
// create function
export default function () {
  // constructing app
  const app = new Vue({
    pagemanager,
    render: (h) => h(App)
  })

  return { app }
}
```

## Usage in Components

There are some components available with in the plugin.

### Renderer

To use the Page Manager Render `<pagemanager-render>` you have to provide data to the `blocks` property.

```javascript
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class Demo extends Vue {
  public render(h) {
    return (
      <div>
        <pagemanager-renderer blocks={example} />
      </div>
    )
  }
}
```

## License
[MIT](/LICENSE)

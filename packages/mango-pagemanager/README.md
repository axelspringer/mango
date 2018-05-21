# :smiley_cat: Mango Page Manager

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
npm i @axelspringer/mango-pagemanager
```

## Usage

Create a `pagemanager.ts` file with the following content.

```javascript
import Vue from 'vue'
import IFrame from '../components/post'
import MangoPageManager from '@axelspringer/mango-pagemanager'

// use pagemanager
Vue.use(PageManager)

export default new PageManager({
  blocks: [
    {
      pageBlock: 'inline_frame',
      component: iFrame
    }
  ]
})
```

This configures the Page Manager to map a page block to a component.

```javascript
import { Vue, Component } from 'vue-property-decorator'
import HOME_QUERY from '../../graphql/home.graphql'

@Component
export default class Home extends Vue {

  /**
   *
   */
  public blocks = []

  /**
   * Render function
   *
   * @param h
   */
  public render() {
    return (
      <main class='start'>
        <pagemanager-renderer blocks={this.blocks || []} />
      </main>
    )
  }
}
```

The pagemanager exposes `$pageblock` on the component with the page block data to render. You have to add a `name` property. This is the property on which the Page Manager data and blocks are matched.

```javascript
import { Vue, Component } from 'vue-property-decorator'

export function renderInnerHtml(h, atts) {
  return atts.map(att => h('iframe', { attrs: att.value }))
}

@Component({
  name: 'iFrame'
})
export default class iFrame extends Vue {
  public render(h) {
    if (!this.$pageblock) return null

    return (<div>{renderInnerHtml(h, this.$pageblock)}</div>)
  }
}

```

## License
[MIT](/LICENSE)

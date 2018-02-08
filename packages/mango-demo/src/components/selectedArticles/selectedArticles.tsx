import { Component, Vue } from 'vue-property-decorator'

import { biggerClass } from './style'

@Component
export class SelectedArticles extends Vue {
  public render() {
    let pageblock = this.$pageblock
    return (
      <div class='container-fluid'>
        <div class='row'>
          <div class='col'>
            <div class={biggerClass}>
              {JSON.stringify(pageblock)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import Vue from 'vue'
import Component from 'vue-class-component'

import { biggerClass } from './style'

@Component
export class SelectedArticles extends Vue {
  public render(h) {
    return (
      <div class='container-fluid'>
        <div class='row'>
          <div class='col'>
            <div class={biggerClass}>
              Test
            </div>
          </div>
        </div>
      </div>
    )
  }
}

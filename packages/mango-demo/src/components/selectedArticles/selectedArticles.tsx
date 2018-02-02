import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'

import { biggerClass } from './style'

@Component
export class SelectedArticles extends Vue {
  @Getter('message') public message

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

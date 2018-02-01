import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'
import { MangoHome } from '@axelspringer/mango-vue'

import { biggerClass } from './style'

@Component
export class Home extends Vue {
  @Getter('message') public message

  public render(h) {
    return (
      <div class='container-fluid'>
        <MangoHome />
        <div class='row'>
          <div class='col'>
            <div class={biggerClass}>
              {this.message}
            </div >
          </div>
        </div>
      </div>
    )
  }
}

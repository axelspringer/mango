import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'
import { HomeProvider } from '@axelspringer/mango-router'

import { biggerClass } from './style'

@Component
export class Post extends Vue {
  @Getter('message') public message

  public render(h) {
    return (
      <HomeProvider>
        <div class='container-fluid'>
          <div class='row'>
            <div class='col'>
              <div class={biggerClass}>
                This is a post
            </div>
            </div>
          </div>
        </div>
      </HomeProvider>
    )
  }
}

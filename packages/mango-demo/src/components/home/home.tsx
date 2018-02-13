import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'
import gql from 'graphql-tag'

import { biggerClass } from './style'

@Component({
  apollo: {
    pageManagerCategory: {
      query: gql`query WP($id: Int!, $lang: String!) {
        pageManagerCategory(id: $id, language: $lang) {
          ... on SelectedArticles {
            pageBlock
            language
            result {
              title
            }
          }
        }
      }`,
      prefetch: true,
      variables() {
        return {
          id: 0,
          lang: 'de'
        }
      },
    }
  }
} as any)
export class Home extends Vue {
  @Getter('message') public message

  public render(h) {
    return (
      <div class='container-fluid'>
        <pagemanager-renderer blocks={this.pageManagerCategory} />
        <div class='row'>
          <div class='col'>
            <div class={biggerClass}>
              This is the Home.
              {this.message}
            </div >
          </div>
        </div>
      </div>
    )
  }
}

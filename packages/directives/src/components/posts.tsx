import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  inject: ['client']
})
export default class Posts extends Vue {
  constructor(...props) {
    super(props)
  }

  public render(h) {
    return <div>{this.client.version}</div>
  }
}

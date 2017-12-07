import { Component, Inject, Vue } from 'vue-property-decorator'

@Component
export default class Posts extends Vue {

  @Inject()
  public test: string

  constructor() {
    super()
  }

  public render(h) {
    return <div>{this.test()}</div>
  }
}

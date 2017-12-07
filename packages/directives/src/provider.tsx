import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
// import WP from './wp'

@Component
export default class Provider extends Vue {

  @Prop()
  public client: object

  public foo = 'foo'

  constructor() {
    super()

    setTimeout(() => {
      this.foo = '3.0.0'
      console.log(this.client.version)
    }, 3000)
  }

  @Provide()
  public test = () => {
    return this.foo
  }

  // public created() {
  //   const { client } = this.$props  // hook into the private api
  //   this._provided = { ...this._provided, ...new WP(client) }
  // }

  public render(h) {
    return this.$slots.default[0]
  }
}

import Vue from 'vue'
import Component from 'vue-class-component'
import WP from './wp'

@Component({
  props: { // hooking in object
    client: Object
  }
})
export default class Provider extends Vue {

  constructor() {
    super()
  }

  public created() {
    const { client } = this.$props
    // hook into the private api
    this._provided = { ...this._provided, ...new WP(client) }
  }

  public render(h) {
    return this.$slots.default[0]
  }
}

export default {
  beforeCreate(): void {
    const options: any = this.$options
    options.mango = options.mango || (options.__mango ? {} : null)
  }
}

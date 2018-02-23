export default function () {
  return {

    inject: { // if so used
      $apolloProvider: { default: null },
    },

    beforeCreate(): void {
      // noop
    },

    created(): void {
      // noop
    },

    beforeDestroy(): void {
      if (this._apollo) {
        this._apollo.destroy()
        this._apollo.null
      }
    }

  }

}

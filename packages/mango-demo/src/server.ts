import bootstrap from './boot'

export default context => {
  // @todo async-await
  return new Promise((resolve, reject) => {
    context.ssr = true
    const { app, router, store } = bootstrap(context)
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all([
        // vuex store prefetch
        ...matchedComponents.map(cmp => cmp.preFetch && cmp.preFetch(store)),
        // apollo prefetch
        // apolloProvider.prefetchAll({
        //   route: router.currentRoute,
        // }, matchedComponents),
      ]).then(() => {
        // context.apolloState = apolloProvider.exportStates()
        context.state = store.state
        resolve(app)
      }).catch(reject)

    }, reject)
  })
}

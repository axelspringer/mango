export default typeof process === 'object' && typeof process.nextTick === 'function' ?
  function (resolvedPromise, fn) {
    if (!resolvedPromise) {
      resolvedPromise = Promise.resolve()
    }
    resolvedPromise.then(() => process.nextTick(fn))
  } :
  setImmediate || setTimeout

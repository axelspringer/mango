export default function (ms, promise) {

  const timeout = new Promise((_resolve, reject) => { // Create a promise that rejects in <ms> milliseconds
    const id = setTimeout(() => {
      clearTimeout(id)
      reject(`Render Timeout after ${ms} ms`)
    }, ms)
  })

  // Returns a race between our timeout and the passed in promise
  return Promise.race([
    promise,
    timeout
  ])
}

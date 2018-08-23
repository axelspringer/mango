export default (obj, keys: string[]) =>
  Object.keys(obj)
    .filter(k => keys.indexOf(k) === -1)
    .reduce((acc, cur) => {
      acc[cur] = obj[cur]
      return acc
    }, {})

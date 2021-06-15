const isFunction = (func) => {
  return typeof func === 'function'
}

const uniqueKey = (prefix = '') => {
  return `${prefix}${new Date().getTime()}`
}

const dispatchAsync = (func, timeToFireAfter = 0) => {
  if (!isFunction(func)) return

  setTimeout(() => {
    func()
  }, timeToFireAfter)
}

export default {
  isFunction,
  uniqueKey,
  dispatchAsync
}

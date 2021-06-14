const isFunction = (func) => {
  return typeof func === 'function'
}

const uniqueKey = (prefix = '') => {
  return `${prefix}${new Date().getTime()}`
}

export default {
  isFunction,
  uniqueKey
}

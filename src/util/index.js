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

// Returns if given paramter or parsed version of parameter is integer or not.
const isParsableToInteger = (value) => {
  return !isNaN(parseInt(value))
}

// Returns parsed integer or fallbackValue if not possible to parse.
const parseInteger = (value, fallbackValue = null) => {
  return isParsableToInteger(value) ? parseInt(value) : fallbackValue
}

const isUndefinedOrNull = (value) => {
  return value === undefined || value === null
}

export default {
  isUndefinedOrNull,
  parseInteger,
  isParsableToInteger,
  isFunction,
  uniqueKey,
  dispatchAsync
}

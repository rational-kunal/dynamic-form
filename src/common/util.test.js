/* eslint-disable no-undef */
import util from 'common/util'

describe('isUndefinedOrNull returns', () => {
  it('truthy if passed value is undefined', () => {
    expect(util.isUndefinedOrNull(undefined)).toBeTruthy()
  })

  it('truthy if passed value is null', () => {
    expect(util.isUndefinedOrNull(null)).toBeTruthy()
  })

  describe('falsy if passed value is some value', () => {
    expect(util.isUndefinedOrNull({})).toBeFalsy()
    expect(util.isUndefinedOrNull(1337)).toBeFalsy()
    expect(util.isUndefinedOrNull('some value')).toBeFalsy()
  })
})

describe('parseInteger will return', () => {
  it('parsed integer if passed value is parsable', () => {
    expect(util.parseInteger('1337')).toBe(1337)
  })

  it('null if passed value is not parsable', () => {
    expect(util.parseInteger('x')).toBeNull()
  })

  it('fallback value if passed value is not parsable', () => {
    expect(util.parseInteger('x', 'fallback')).toBe('fallback')
  })
})

describe('isParsableToInteger will return', () => {
  it('truthy if passed value is parsable to integer', () => {
    expect(util.isParsableToInteger('1337')).toBeTruthy()
  })

  it('falsy if passed value is not parsable to integer', () => {
    expect(util.isParsableToInteger('x')).toBeFalsy()
  })
})

describe('isFunction returns', () => {
  it('truthy if passed variable is function', () => {
    expect(
      util.isFunction(function (x) {
        return x
      })
    ).toBeTruthy()
    expect(util.isFunction(() => {})).toBeTruthy()
  })

  it('falsy if passed variable is not a function', () => {
    expect(util.isFunction(undefined)).toBeFalsy()
    expect(util.isFunction('undefined')).toBeFalsy()
  })
})

test('dispatchAsync will execute passed function', (done) => {
  util.dispatchAsync(() => {
    done()
  })
})

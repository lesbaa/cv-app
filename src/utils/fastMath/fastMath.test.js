/* eslint-env jest */
/* global performance */
import {
  abs,
  floor,
} from './'

describe('abs', () => {
  it('returns the absolute value of a number', () => {
    expect(abs(-5.0)).toBe(5.0)

    expect(abs(5)).toBe(5.0)
  })

  it('does it faster than Math.abs', () => {
    const fastAbs = {
      start: performance.now(),
    }
    for (let i = 0; i < 100000; i++) {
      abs(-5.0)
    }

    fastAbs.end = performance.now()

    const mathAbs = {
      start: performance.now(),
    }

    for (let i = 0; i < 100000; i++) {
      Math.abs(-5.0)
    }

    mathAbs.end = performance.now()

    const fastAbsDuration = fastAbs.end - fastAbs.start
    const mathAbsDuration = mathAbs.end - mathAbs.start

    expect(fastAbsDuration).toBeLessThan(mathAbsDuration)

  })

})

describe('floor', () => {
  it('returns the integer part of a number', () => {
    expect(floor(5.432425)).toBe(5)

    expect(floor(-5.343234)).toBe(-5)
  })

  it('does it faster than Math.floor', () => {
    const fastFloor = {
      start: performance.now(),
    }
    for (let i = 0; i < 100000; i++) {
      floor(5.1415)
    }

    fastFloor.end = performance.now()

    const mathFloor = {
      start: performance.now(),
    }

    for (let i = 0; i < 100000; i++) {
      Math.floor(5.1415)
    }

    mathFloor.end = performance.now()

    const fastFloorDuration = fastFloor.end - fastFloor.start
    const mathFloorDuration = mathFloor.end - mathFloor.start

    expect(fastFloorDuration).toBeLessThan(mathFloorDuration)

  })
})

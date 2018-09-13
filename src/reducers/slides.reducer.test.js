/* eslint-env jest */
/* eslint-disable no-undefined */
import { RECEIVE_SLIDES } from '~/constants/actionTypes'
import reducer from './slides.reducer'

jest.mock('~/utils/reduceToKeyValueStore', () => n => ({
  key: 'value',
  value: 'key',
}))

const defaultState = {}

const randomState = {
  foo: true,
}

describe('slides reducer', () => {
  it('returns the default state if no action nor state is passed', () => {
    const initState = reducer()
    expect(initState).toEqual(defaultState)
    expect(initState).not.toBe(defaultState)
  })

  it('returns the same state if no action is passed', () => {
    const initState = reducer(randomState)
    expect(initState).toEqual(randomState)
    expect(initState).not.toBe(defaultState)
  })

  it('updates the state correctly when RECEIVE_SLIDES action is passed', () => {
    const result = reducer(undefined, {
      type: RECEIVE_SLIDES,
      payload: {
        slides: [],
      },
    })

    const expected = {
      key: 'value',
      value: 'key',
    }

    expect(result).toEqual(expected)
    expect(result).not.toBe(expected)
  })
})

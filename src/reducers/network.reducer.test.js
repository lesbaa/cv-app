/* eslint-env jest */
/* eslint-disable no-undefined */
import {
  IS_FETCHING,
  IS_NOT_FETCHING,
  FETCH_ERROR,
} from '~/constants/actionTypes'
import reducer from './network.reducer'

const defaultState = {
  isFetching: false,
  fetchError: {
    hasError: false,
    error: null,
  },
}


const randomState = {
  foo: true,
}

describe('detailsModal reducer', () => {
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

  it('updates the state correctly when IS_FETCHING action is passed', () => {
    const result = reducer(undefined, {
      type: IS_FETCHING,
    })

    const expected = {
      ...defaultState,
      isFetching: true,
    }

    expect(result).toEqual(expected)
    expect(result).not.toBe(expected)
  })

  it('updates the state correctly when IS_NOT_FETCHING action is passed', () => {
    const result = reducer(undefined, {
      type: IS_NOT_FETCHING,
    })

    const expected = {
      ...defaultState,
      isFetching: false,
    }

    expect(result).toEqual(expected)
    expect(result).not.toBe(expected)
  })

  it('updates the state correctly when FETCH_ERROR action is passed', () => {
    const result = reducer(undefined, {
      type: FETCH_ERROR,
      payload: 'MOCK_ERROR',
    })

    const expected = {
      isFetching: false,
      fetchError: {
        hasError: true,
        error: 'MOCK_ERROR',
      },
    }

    expect(result).toEqual(expected)
    expect(result).not.toBe(expected)
  })

})

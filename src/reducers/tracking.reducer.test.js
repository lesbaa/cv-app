/* eslint-env jest */
/* eslint-disable no-undefined */
import {
  REQUEST_TRACKING,
  ACCEPT_TRACKING,
  DENY_TRACKING,
} from '~/constants/actionTypes'
import reducer from './tracking.reducer'

const defaultState = {
  trackingRequested: false,
  canTrack: false,
  dialogVisible: false,
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

  it('updates the state correctly when REQUEST_TRACKING action is passed', () => {
    const result = reducer(undefined, {
      type: REQUEST_TRACKING,
    })

    const expected = {
      ...defaultState,
      dialogVisible: true,
      trackingRequested: true,
    }

    expect(result).toEqual(expected)
    expect(result).not.toBe(expected)
  })

  it('updates the state correctly when ACCEPT_TRACKING action is passed', () => {
    const result = reducer(undefined, {
      type: ACCEPT_TRACKING,
    })

    const expected = {
      ...defaultState,
      dialogVisible: false,
      canTrack: true,
    }

    expect(result).toEqual(expected)
    expect(result).not.toBe(expected)
  })

  it('updates the state correctly when DENY_TRACKING action is passed', () => {
    const result = reducer(undefined, {
      type: DENY_TRACKING,
      payload: 'MOCK_ERROR',
    })

    const expected = {
      ...defaultState,
      dialogVisible: false,
      canTrack: false,
    }

    expect(result).toEqual(expected)
    expect(result).not.toBe(expected)
  })

})

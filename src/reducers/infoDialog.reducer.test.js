/* eslint-env jest */
/* eslint-disable no-undefined */
import {
  SHOW_INFO_DIALOG,
  HIDE_INFO_DIALOG,
} from '~/constants/actionTypes'
import reducer from './infoDialog.reducer'

const defaultState = {
  isVisible: false,
  message: null,
}

const randomState = {
  foo: true,
}

const mockPayload = {
  message: 'MOCK_MESSAGE',
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

  it('updates the state correctly when SHOW_INFO_DIALOG action is passed', () => {
    const result = reducer(undefined, {
      type: SHOW_INFO_DIALOG,
      payload: mockPayload,
    })

    const expected = {
      isVisible: true,
      ...mockPayload,
    }

    expect(result).toEqual(expected)
    expect(result).not.toBe(expected)
  })

  it('updates the state correctly when HIDE_INFO_DIALOG action is passed', () => {
    const result = reducer({
      random: true,
    }, {
      type: HIDE_INFO_DIALOG,
    })

    const expected = {
      isVisible: false,
      random: true,
    }

    expect(result).toEqual(expected)
    expect(result).not.toBe(expected)
  })

})

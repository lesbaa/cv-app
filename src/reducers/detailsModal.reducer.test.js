/* eslint-env jest */
/* eslint-disable no-undefined */
import {
  SHOW_SKILL_DETAIL_MODAL,
  HIDE_SKILL_DETAIL_MODAL,
} from '~/constants/actionTypes'
import reducer from './detailsModal.reducer'

const defaultState = {
  modalIsVisible: false,
  modalTitle: null,
  modalContent: null,
  id: null,
}

const randomState = {
  foo: true,
}

const mockPayload = {
  modalTitle: 'MOCK_TITLE',
  modalContent: 'MOCK_CONTENT',
  id: 'MOCK_ID',
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

  it('updates the state correctly when SHOW_SKILL_DETAIL_MODAL action is passed', () => {
    const result = reducer(undefined, {
      type: SHOW_SKILL_DETAIL_MODAL,
      payload: mockPayload,
    })

    const expected = {
      modalIsVisible: true,
      ...mockPayload,
    }

    expect(result).toEqual(expected)
    expect(result).not.toBe(expected)
  })

  it('updates the state correctly when HIDE_SKILL_DETAIL_MODAL action is passed', () => {
    const result = reducer({
      random: true,
    }, {
      type: HIDE_SKILL_DETAIL_MODAL,
    })

    const expected = {
      modalIsVisible: false,
      random: true,
    }

    expect(result).toEqual(expected)
    expect(result).not.toBe(expected)
  })

})

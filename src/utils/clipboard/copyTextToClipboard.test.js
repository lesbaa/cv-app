/* eslint-env jest */
/* global document navigator */
import copyTextToClipboard from './copyTextToClipboard'
import fallbackCopyTextToClipboard from './fallbackCopyTextToClipboard'

jest.mock('./fallbackCopyTextToClipboard', () => jest.fn(() => 'MOCK'))

describe('copyTextToClipBoard', () => {

  beforeEach(() => {
    navigator.clipboard = null
    jest.clearAllMocks()
  })

  it('calls fallbackCopyTextToClipBoard if clipboard API is not present', async () => {

    const expectedMockReturn = await copyTextToClipboard('mock-text')

    expect(expectedMockReturn).toBe('MOCK')

    expect(fallbackCopyTextToClipboard).toHaveBeenCalledWith('mock-text')
  })

  it('calls clipboard.writeText and returns true if successful', async () => {

    navigator.clipboard = {
      writeText: jest.fn(() => Promise.resolve()),
    }

    const success = await copyTextToClipboard('text')

    expect(success).toBe(true)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('text')
  })

  it('fails gracefully if theres an error', async () => {
    const mockError = new Error('ach crap')

    const consoleSpy = jest.spyOn(console, 'error')

    navigator.clipboard = {
      writeText: jest.fn(() => { throw mockError }),
    }

    const success = await copyTextToClipboard('text')

    expect(success).toBe(false)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('text')
    expect(consoleSpy).toHaveBeenCalledWith('Unable to copy to clipboard: ', mockError)
  })


})

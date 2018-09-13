/* eslint-env jest */
/* global document navigator */
import fallbackCopyTextToClipboard from './fallbackCopyTextToClipboard'


describe('fallbackCopyTextToClipboard', () => {

  const documentCreateElement = document.createElement
  const documentBodyAppendChild = document.body.appendChild
  const documentBodyRemoveChild = document.body.removeChild

  const mockElement = {
    focus: jest.fn(),
    select: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    document.createElement = jest.fn(() => mockElement)
    document.execCommand = jest.fn(() => 'exec called')
    document.body.appendChild = jest.fn(() => mockElement)
    document.body.removeChild = jest.fn(() => true)

  })

  afterEach(() => {
    document.createElement = documentCreateElement
    document.body.appendChild = documentBodyAppendChild
    document.body.removeChild = documentBodyRemoveChild
  })

  it('creates a textArea element, focuses it and selects it', () => {
    fallbackCopyTextToClipboard('smoog')

    expect(document.createElement).toHaveBeenCalledWith('textarea')

    expect(mockElement.focus).toHaveBeenCalled()

    expect(mockElement.select).toHaveBeenCalled()
  })

  it('removes the textArea element before returning', () => {
    fallbackCopyTextToClipboard('smoog')
    expect(document.body.removeChild).toHaveBeenCalledWith(mockElement)
  })

  it('calls document.execCommand and returns it value', () => {
    const success = fallbackCopyTextToClipboard('smoog')

    expect(document.execCommand).toHaveBeenCalledWith('copy')

    expect(success).toBe('exec called')
  })

  it('fails gracefully if document.execCommand throws an error', () => {
    const consoleSpy = jest.spyOn(console, 'error')
    const mockError = new Error('ach kak')
    document.execCommand = jest.fn(() => { throw mockError })
    const success = fallbackCopyTextToClipboard('smoog')

    expect(document.execCommand).toHaveBeenCalledWith('copy')

    expect(consoleSpy).toHaveBeenCalledWith('Unable to copy to clipboard: ', mockError)

    expect(success).toBe(false)
  })
})

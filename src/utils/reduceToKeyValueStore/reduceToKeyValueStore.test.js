/* eslint-env jest */
import reduceToKeyValueStore from './'

const mockArray = [
  {
    id: 'a',
    mock: true,
    name: 'matthew',
    number: 1,
  },
  {
    id: 'b',
    mock: true,
    name: 'mark',
    number: 1,
  },
  {
    id: 'c',
    mock: false,
    name: 'luke',
    number: 1,
  },
  {
    id: 'd',
    mock: true,
    name: 'beyoncé',
    number: 1,
  },
]

const expectedWithId = {
  a: {
    id: 'a',
    mock: true,
    name: 'matthew',
    number: 1,
  },
  b: {
    id: 'b',
    mock: true,
    name: 'mark',
    number: 1,
  },
  c: {
    id: 'c',
    mock: false,
    name: 'luke',
    number: 1,
  },
  d: {
    id: 'd',
    mock: true,
    name: 'beyoncé',
    number: 1,
  },
}
const expectedWithName = {
  matthew: {
    id: 'a',
    mock: true,
    name: 'matthew',
    number: 1,
  },
  mark: {
    id: 'b',
    mock: true,
    name: 'mark',
    number: 1,
  },
  luke: {
    id: 'c',
    mock: false,
    name: 'luke',
    number: 1,
  },
  beyoncé: {
    id: 'd',
    mock: true,
    name: 'beyoncé',
    number: 1,
  },
}

describe('reduceToKeyValueStore', () => {
  it('it reduces and array of obects to a key value store using the "id" field as a key', () => {
    const received = reduceToKeyValueStore({
      array: mockArray,
    })

    expect(received).toEqual(expectedWithId)
  })

  it('it reduces and array of obects to a key value store using the specified field name as a key', () => {
    const received = reduceToKeyValueStore({
      array: mockArray,
      key: 'name',
    })

    expect(received).toEqual(expectedWithName)
  })

  it('throws an error and returns an object if the array argument is not an array', () => {
    const errorSpy = jest.spyOn(console, 'error')
    const traceSpy = jest.spyOn(console, 'trace')
    const received = reduceToKeyValueStore({
      array: 'a small man fashioning a cayak out of a log',
    })

    expect(errorSpy).toHaveBeenCalledWith(
      'reduceToKeyValueStore: invalid object passed as argument!',
      'a small man fashioning a cayak out of a log',
    )

    expect(traceSpy).toHaveBeenCalled()

    expect(received).toEqual({})
  })
})

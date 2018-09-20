/* eslint-env jest */
/* global performance */
import dedupeArrayOfObjects from './depupeArrayOfObjects'

const mockArray = [
  {
    a: 1,
    b: 1,
  },
  {
    a: 2,
    b: 2,
  },
  {
    a: 3,
    b: 3,
  },
]

describe('dedupeArrayOfObjects', () => {
  it('removes objects with duplicate keys from an array', () => {
    const received = dedupeArrayOfObjects({
      array: [
        ...mockArray,
        {
          a: 1,
          b: 'pies',
        },
        {
          a: 2,
          b: 'cornocopia',
        },
        {
          a: 1,
          b: 'crimson',
        },
      ],
      field: 'a',
    })
    expect(received).toEqual([
      ...mockArray,
      {
        a: 2,
        b: 'cornocopia',
      },
    ])
  })
})

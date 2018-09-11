/* eslint-env jest */
import buildQueryString from './'

describe('buildQueryString', () => {
  it('builds a query string correctly given an object of key:value pairs', () => {
    const received = buildQueryString({
      url: 'http://lesmoffat.co.uk/cv/secret?ref=tests',
      more: '#!@',
    })
    expect(received).toBe('?url=http%3A%2F%2Flesmoffat.co.uk%2Fcv%2Fsecret%3Fref%3Dtests&more=%23!%40')
  })

  it('it fails gracefully if given no arguments', () => {
    const received = buildQueryString()
    expect(received).toBe('')
  })

  it('it fails gracefully if given a function as an argument', () => {
    const received = buildQueryString(n => n)
    expect(received).toBe('')
  })

  it('it fails gracefully if given a string as an argument', () => {
    const received = buildQueryString('')
    expect(received).toBe('')
  })

  it('it fails gracefully if given an array as an argument', () => {
    const received = buildQueryString([])
    expect(received).toBe('')
  })

  it('it fails gracefully if given a number as an argument', () => {
    const received = buildQueryString(6)
    expect(received).toBe('')
  })
})

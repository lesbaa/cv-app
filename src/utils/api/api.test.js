/* eslint-env jest */
import fetch from 'isomorphic-fetch'
import { API_BASE_URL } from '~/../les.config'

import {
  buildUrl,
  reportLesalytics,
  getSlide,
  getSlides,
  getSkills,
  getSkill,
} from './api'

jest.mock('isomorphic-fetch', () => jest.fn(
  () => ({
    json: () => mockJson(),
  })
))

const mockJson = jest.fn(() => ({
  results: ['json'],
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('buildUrl', () => {
  it('builds the url in the correct form', () => {
    const expected = `//${API_BASE_URL}/spon?a=1&b=2&c=3`
    const returned = buildUrl({
      path: 'spon',
      params: {
        a: 1,
        b: 2,
        c: 3,
      },
    })

    expect(returned).toBe(expected)
  })
})

describe('reportLesayltics', () => {
  it('calls fetch with the correct url', () => {
    reportLesalytics({
      ref: 'hey',
      page: 'you',
      platform: 'guys!',
    })

    expect(fetch).toHaveBeenCalledWith('//api.lesmoffat.co.uk/api/v1/lesalytics?ref=hey&page=you&platform=guys!')
  })

  it('calls response.json and returns the json response', async () => {
    const json = await reportLesalytics({})

    expect(json).toEqual({
      results: ['json'],
    })

    expect(mockJson).toHaveBeenCalled()
  })
})

describe('getSlide', () => {
  it('calls fetch with the correct url', () => {
    getSlide({
      slidename: 'hello',
      params: {
        hi: 'i am a query param',
      },
    })

    expect(fetch).toHaveBeenCalledWith('//api.lesmoffat.co.uk/api/v1/slides?id=hello&hi=i%20am%20a%20query%20param')
  })

  it('calls response.json and returns the json response', async () => {
    const json = await getSlide({})

    expect(json).toEqual({
      results: ['json'],
    })

    expect(mockJson).toHaveBeenCalled()
  })
})

describe('getSlides', () => {
  it('calls fetch with the correct url', () => {
    getSlides({
      params: {
        yo: 'yeah',
      },
    })

    expect(fetch).toHaveBeenCalledWith('//api.lesmoffat.co.uk/api/v1/slides?yo=yeah')
  })

  it('calls response.json and returns the json response', async () => {
    const json = await getSlides({})

    expect(json).toEqual({
      results: ['json'],
    })

    expect(mockJson).toHaveBeenCalled()
  })
})

describe('getSkill', () => {
  it('calls fetch with the correct url', () => {
    getSkill({
      id: 12345,
      params: {
        mmmm: 'nomnomnom',
      },
    })

    expect(fetch).toHaveBeenCalledWith('//api.lesmoffat.co.uk/api/v1/skills?id=12345&mmmm=nomnomnom')
  })

  it('calls response.json and returns the json response', async () => {
    const json = await getSkill({
      params: {
        mmmm: 'nomnomnom',
      },
    })

    expect(json).toEqual({
      results: ['json'],
    })

    expect(mockJson).toHaveBeenCalled()
  })
})

describe('getSkills', () => {
  it('calls fetch with the correct url', () => {
    getSkills({
      params: {
        hey: 'you',
      },
    })

    expect(fetch).toHaveBeenCalledWith('//api.lesmoffat.co.uk/api/v1/skills?hey=you')
  })

  it('calls response.json and returns the json response', async () => {
    const json = await getSkills({})

    expect(json).toEqual({
      results: ['json'],
    })

    expect(mockJson).toHaveBeenCalled()
  })
})


import fetch from 'isomorphic-fetch'
import buildQueryString from '~/utils/buildQueryString'
import data from '~/../static/data.json'
// TODO this will need changed once the API is built

export const getSlides = async ({ params }) => {
  return data.slides
}

export const getSlide = async ({ params, slidename }) => {
  return data.slides[slidename]
}

export const getDevSkills = async ({ params }) => {
  return data.devSkills
}

// TODO tests for this

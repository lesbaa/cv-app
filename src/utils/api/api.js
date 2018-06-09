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

export const getDevSkill = async ({ params, skillId }) => {
  return data.devSkills[skillId]
}

export const getSoftSkills = async ({ params }) => {
  return data.softSkills
}

export const getSoftSkill = async ({ params, skillId }) => {
  return data.softSkills[skillId]
}

// TODO tests for this

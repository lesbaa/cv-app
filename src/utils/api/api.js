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

export const getSkills = async ({ params = {} }) => {
  return params.type
    ? data.skills.filter(skill => skill.type === params.type)
    : data.skills
}

export const getSkill = async ({ params, id }) =>
  data.skills.filter(skill => skill.id === id)

// TODO tests for this

import fetch from 'isomorphic-fetch'
import buildQueryString from '~/utils/buildQueryString'
import { API_BASE_URL } from '~/../les.config'

export const buildUrl = ({ model, params }) =>
  `//${API_BASE_URL}/${model}${buildQueryString(params)}`

export const reportLesalytics = async ({
  ref,
  page,
  platform,
}) => {
  const url = buildUrl({
    model: 'lesalytics',
    params: {
      ref,
      page,
      platform,
    },
  })
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export const getSlides = async ({ params } = {}) => {
  const url = buildUrl({
    model: 'slides',
    params,
  })
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export const getSlide = async ({ params, slidename }) => {
  const url = buildUrl({
    model: 'slides',
    params: {
      id: slidename,
      ...params,
    },
  })
  const response = await fetch(url)
  const json = await response.json()
  return json.results[0]
}

export const getSkills = async ({ params = {} }) => {
  const url = buildUrl({
    model: 'skills',
    params: {
      ...params,
    },
  })
  const response = await fetch(url)
  const json = await response.json()
  return json.results
}

export const getSkill = async ({ params, id }) => {
  const url = buildUrl({
    model: 'skills',
    params: {
      id,
      ...params,
    },
  })
  const response = await fetch(url)
  const json = await response.json()
  return json.results
}

// TODO tests for this

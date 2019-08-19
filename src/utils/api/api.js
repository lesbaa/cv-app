import fetch from 'isomorphic-fetch'
import buildQueryString from '~/utils/buildQueryString'
import getConfig from '~/../les.config'

export const buildUrl = ({ path, params }) =>
  `${getConfig().API_BASE_URL}/${path}${buildQueryString(params)}`

export const reportLesalytics = async ({
  ref,
  page,
  platform,
}) => {
  const url = buildUrl({
    path: 'lesalytics',
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
  console.log('getSlides', params)
  const url = buildUrl({
    path: 'slides',
    params,
  })
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export const getSlide = async ({ params, slidename }) => {
  console.log('getSlide', params, slidename)
  const url = buildUrl({
    path: 'slides',
    params: {
      id: slidename,
      ...params,
    },
  })
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export const getSkills = async ({ params = {} }) => {
  const url = buildUrl({
    path: 'skills',
    params: {
      ...params,
    },
  })
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export const getReferences = async ({ params = {} } = {}) => {
  const url = buildUrl({
    path: 'references',
    params: {
      ...params,
    },
  })
  const response = await fetch(url)
  const json = await response.json()
  return json
}

export const getSkill = async ({ params, id }) => {
  const url = buildUrl({
    path: 'skills',
    params: {
      id,
      ...params,
    },
  })
  const response = await fetch(url)
  const json = await response.json()
  return json
}


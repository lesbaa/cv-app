const buildQueryString = (paramsObj = {}) =>
  Object.entries(paramsObj)
    .map(entry => entry.map(encodeURIComponent))
    .reduce(
      (queryString, [key, value]) => `${queryString}&${key}=${value}`,
      '?'
    )

module.exports = buildQueryString

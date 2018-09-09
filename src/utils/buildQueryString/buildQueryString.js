const buildQueryString = (paramsObj = {}) =>
  Object.entries(paramsObj)
    .map(entry => entry.map(encodeURIComponent))
    .reduce(
      (queryString, [key, value], i) => [
        queryString,
        i !== 0 && '&',
        `${key}=${value}`,
      ]
        .filter(Boolean)
        .join(''),
      '?'
    )

module.exports = buildQueryString

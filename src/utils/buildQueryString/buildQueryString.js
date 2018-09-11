const buildQueryString = (paramsObj = '') => {
  const isFunc = (typeof paramsObj === 'function')
  const isString = (typeof paramsObj === 'string')
  const isNum = (typeof paramsObj === 'number')
  const isArray = (Array.isArray(paramsObj))

  if (isFunc || isString || isNum || isArray) return ''

  return Object.entries(paramsObj)
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
}

module.exports = buildQueryString

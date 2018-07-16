export default function tweenState({
  properties,
  from,
  to,
  alpha,
}) {
  /* eslint-disable guard-for-in */
  /* eslint-disable no-restricted-syntax */
  /* eslint-disable no-continue */
  const newState = {}
  for (const prop in to) {
    if (prop === 'transition' || prop === 'animation') continue
    if (properties && !properties.includes(prop)) continue
    const toHasPropHasLength = to[prop] && Object.keys(to[prop]).length
    const fromHasPropHasLength = from[prop] && Object.keys(from[prop]).length

    const isDimensionless = typeof to[prop] === 'number'

    if (isDimensionless) {
      const targetValue = to[prop]
      const initialValue = from[prop] || 0
      const range = targetValue - initialValue
      const delta = range * alpha

      newState[prop] = initialValue + delta
    }

    if (!toHasPropHasLength || !fromHasPropHasLength) continue
    newState[prop] = {}

    for (const dimension in to[prop]) {
      const targetValue = to[prop][dimension]
      if (typeof targetValue !== 'number') continue
      const initialValue = from[prop][dimension] || 0
      const range = targetValue - initialValue
      const delta = range * alpha
      newState[prop][dimension] = initialValue + delta
    }
  }
  return newState
}
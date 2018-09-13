export default ({
  key = 'id',
  array,
}) => {
  if (!Array.isArray(array)) {
    console.error('reduceToKeyValueStore: invalid object passed as argument!', array)
    console.trace()
    return {}
  }
  return array.reduce((keyValueStore, arrayItem) => ({
    ...keyValueStore,
    [arrayItem[key]]: arrayItem,
  }), {})
}

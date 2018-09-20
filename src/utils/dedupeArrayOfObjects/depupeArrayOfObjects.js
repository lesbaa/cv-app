export default function dedupeArrayOfObjects({ array = [], field }) {
  return array.reduce((acc, el) => {
    const arrayHasEntryWithFieldValue = acc
      .map(arrayElement => arrayElement[field])
      .includes(el[field])

    if (arrayHasEntryWithFieldValue) return acc

    return [
      ...acc,
      el,
    ]
  }, [])
}

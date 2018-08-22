export function chooseRandom(arr) {
  const num = ~~(Math.random() * arr.length)
  return arr[num]
}

export function random(min = 0, max = 1, isInt = true) {
  const decimal = isInt
    ? 0
    : Math.random()

  return ~~(Math.random() * (max + 1 - min)) + min + decimal
}

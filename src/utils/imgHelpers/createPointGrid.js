const createPointGrid = ({
  scale = 1,
  position = { x: 0, y: 0 },
  density = 1,
} = {}) => ({ points }) => {

  const {
    width,
    height,
  } = points

  const grid = []

  for (let i = 0; i < points.length; i += 1 / density) {

    const x = (i % width) * scale + position.x - (width * scale) / 2.3
    const y = (i / width) * scale + position.y - height
    const color = points[i]
    const alpha = color && color[3]

    if (alpha && alpha > 250) grid.push({ x, y })

  }

  return grid

}

export default createPointGrid

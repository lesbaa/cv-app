/* eslint-env browser */
const scalePixels = scaleFactor => (pixels) => {
  const points = []

  for (let i = 0, a = 0; i < pixels.length / scaleFactor; i += scaleFactor, a += 1) {
    points[a] = pixels[i]
  }

  points.width = pixels.width / scaleFactor
  points.height = pixels.height / scaleFactor

  return {
    points,
  }
}

export default scalePixels

// TODO tests!
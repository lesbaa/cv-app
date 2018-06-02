/* eslint-env browser */
export default function parseImgDataToPixels({ data, w, h }) {

  const out = []

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]
    out.push([r, g, b, a])
  }

  out.width = w
  out.height = h

  return out

}

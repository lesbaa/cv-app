/* eslint-env browser */
export default function loadImg(src) {

  return new Promise((resolve, reject) => {
    const img = document.createElement('img')

    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.src = src
  })

}

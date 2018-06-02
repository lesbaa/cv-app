/* eslint-env browser */
export default function getImageData(img) {

  const imgCanvas = document.createElement('canvas')

  imgCanvas.width = img.width
  imgCanvas.height = img.width

  const imgCtx = imgCanvas.getContext('2d')

  imgCtx.drawImage(img, 0, 0)

  const { data } = imgCtx.getImageData(0, 0, imgCanvas.width, imgCanvas.height)
  return {
    data,
    w: imgCanvas.width,
    h: imgCanvas.height,
  }

}

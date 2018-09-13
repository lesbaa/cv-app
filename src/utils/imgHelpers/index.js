import { composeP } from 'ramda'
import createPointGrid from './createPointGrid'
import getImageData from './getImageData'
import loadImg from './loadImg'
import parseImgDataToPixels from './parseImgDataToPixels'
import scalePixels from './scalePixels'

const createGridLoader = ({
  scale = 1,
  position = { x: 0, y: 0 },
  density = 1,
} = {}) => composeP(
  createPointGrid({
    scale,
    position,
    density,
  }),
  scalePixels(1),
  parseImgDataToPixels,
  getImageData,
  loadImg,
)

export default createGridLoader

export {
  createPointGrid,
  getImageData,
  loadImg,
  parseImgDataToPixels,
  scalePixels,
}

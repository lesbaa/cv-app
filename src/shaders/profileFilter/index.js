import fragment from './frag.glsl'
import vertex from './vert.glsl'

export default {
  fragment,
  vertex,
  uniforms: {
    uTime: {
      type: 'f',
      value: 0,
    },
    uMouseSpeed: {
      type: 'f',
      value: 0,
    },
    uTransitionProgress: {
      type: 'f',
      value: 0,
    },
  },
}

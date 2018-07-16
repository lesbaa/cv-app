import fragment from './frag.glsl'

export default {
  fragment,
  uniforms: {
    uTime: {
      type: 'f',
      value: 0,
    },
    uMouse: {
      type: 'v2',
      value: [0, 0],
    },
    uTransitionProgress: {
      type: 'v2',
      value: 0,
    },
  },
}
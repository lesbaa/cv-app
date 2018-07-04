import fragment from './frag.glsl'

export default {
  fragment,
  uniforms: {
    uTime: {
      type: 'f',
      value: 0,
    },
    uMouseX: {
      type: 'f',
      value: 0,
    },
  },
}
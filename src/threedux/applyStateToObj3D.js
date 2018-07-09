/**
 * 
 * @param {Object} setup object
 * three.js bindings for tween library
 * obj3D: a three.js object, supported object types so far are
 *  - Object3D
 *  - Material
 *  - ShaderMaterial,
 *  - Light
 *  - Camera
 * 
 * state: the state object passed from tween-state
 *
 * ** NOT ALL PROPERTIES OF THESE OBJECTS ARE CURRENTLY TRANSITIONABLE **
 * ** TODO refactor for more general usage **
 * 
 * example usage:
 * 

const alpha = easingFunction(transitionProgress)
const state = tweenState({
  alpha,
  from: this.tween.currentState,
  to: this.tween.targetState,
  debug: this.debug
})

applyStateToObj3D({
  obj3D: myMesh,
  state,
})

 */
export default function applyStateToObj3D({
  obj3D,
  state,
}) {
  for (const prop in state) {
    if (prop === 'uniforms' && state.uniforms) {
      for (const uniformName in state.uniforms) {
        if (typeof obj3D.uniforms[uniformName].value !== 'number') continue
        obj3D.uniforms[uniformName].value = state.uniforms[uniformName]
      }
      continue
    }

    for (const dimension in state[prop]) {
      if (!obj3D[prop]) continue
      obj3D[prop][dimension] = state[prop][dimension]
    }
  }
}

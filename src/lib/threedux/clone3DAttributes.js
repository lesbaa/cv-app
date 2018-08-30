/**
 * clone3DAttributes
 * @param {Object} obj 
 * returns a function that either deep clones a tween-state object to a new object or
 * creates a tween-state object from a three.js object
 */

/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

export default function clone3DAttributes(attrs = [
  'x',
  'y',
  'rotation',
  'position',
  'scale',
  'uniforms',
  'attributes',
]) {
  return (obj) => {
    const newObj = {}
    for (let i = 0; i < attrs.length; i++) {

      const attr = attrs[i]

      if (attr === 'uniforms' && obj.uniforms) {
        newObj.uniforms = {}
        for (const uniformName in obj.uniforms) {
          newObj.uniforms[uniformName] = obj.uniforms[uniformName]
        }
        continue
      }

      if (attr === 'rotation') { // this should be if isScalar attr
        newObj.rotation = obj.rotation
        continue
      }

      if (obj[attr]) {
        newObj[attr] = {}
        newObj[attr].x = obj[attr].x
        newObj[attr].y = obj[attr].y
      }
    }
    return newObj
  }
}

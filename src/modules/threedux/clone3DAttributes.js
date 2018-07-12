/**
 * clone3DAttributes
 * @param {Object} obj 
 * returns a function that either deep clones a tween-state object to a new object or
 * creates a tween-state object from a three.js object
 */
export default function clone3DAttributes (attrs = [
  'x',
  'y',
  'rotation',
  'scale',
  'uniforms',
  'attributes',
]) {
  return (obj) => {
    const newObj = {}
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i]

      if (attr === 'uniforms' && obj.uniforms){
        newObj.uniforms = {}
        for (const uniformName in obj.uniforms) {
          newObj.uniforms[uniformName] = obj.isShaderMaterial || (obj.material && obj.material.isShaderMaterial)
            ? obj.uniforms[uniformName].value
            : obj.uniforms[uniformName]
        }
        continue
      }
      
      if (obj[attr]) {
        newObj[attr] = {}
        newObj[attr].x = obj[attr].x
        newObj[attr].y = obj[attr].y
        newObj[attr].z = obj[attr].z
      }
    }
    return newObj
  } 
}
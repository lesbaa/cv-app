/* eslint-env browser */
/* global THREE */

// FYI, this is my first webComponent / custom element...

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragmentShader = `
uniform float uTime;
  void main() {
    float r =
      sin(uTime) +
      sin((gl_FragCoord.x + uTime) / 2.0) +
      sin((gl_FragCoord.y + uTime) / 2.0) * sin(uTime)
      ;
    float g = 
      cos(uTime) +
      cos((gl_FragCoord.x + uTime) / 2.0) -
      cos((gl_FragCoord.y + uTime) / 2.0) * cos(uTime * 4.0);
    float b = sin((gl_FragCoord.x) / 200.0 + uTime * 3.0);
    gl_FragColor = vec4(
      r / 5.0,
      g / 5.0,
      b * 2.0,
      0.0
    );
  }
`

class LesAnim extends HTMLElement {
  constructor() {
    super()
    const threeScript = document.createElement('script')
    this.init = this.init.bind(this)
    this.initCanvas = this.initCanvas.bind(this)
    this.initThree = this.initThree.bind(this)
    this.render = this.render.bind(this)
    threeScript.addEventListener('load', this.init)
    threeScript.src = '//threejs.org/build/three.min.js'
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(threeScript)
  }

  init() {
    this.initCanvas()
    this.initSvg()
    this.initThree()
  }

  initCanvas() {
    const c = document.createElement('canvas')
    c.classList.add('threeCanvas')
    const style = document.createElement('style')
    style.textContent = `
      .threeCanvas {
        width: 100%;
        height: auto;
        clip-path: url(#text);
        position: absolute;
        left: 0;
      }

    `
    this.shadowRoot.appendChild(style)
    this.shadowRoot.appendChild(c)
    this.canvas = c
  }

  initSvg() {
    const svgNS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNS, 'svg')
    svg.setAttribute('height', '100%')
    svg.setAttribute('width', '100%')

    const style = document.createElement('style')
    style.textContent = `
      #text {
        font-family: 'LeagueSpartan'
      }

    `

    this.shadowRoot.appendChild(style)

    const clipPath = document.createElementNS(svgNS, 'clipPath')
    clipPath.id = 'text'

    const text = document.createElementNS(svgNS, 'text')

    text.innerText = 'Les.'
    text.setAttribute('y', '0%')
    text.setAttribute('font-size', '200')

    clipPath.appendChild(text)
    svg.appendChild(text)
    this.shadowRoot.appendChild(svg)
//     <svg class="hiya" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 250" width="128vh" height="62vh">
//   <clipPath id="text">
//     <text y="62%" height="100%" font-size="200">
//       Hiya
//     </text>
//   </clipPath>
// </svg>
  }

  initThree() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    })

    this.camera = new THREE.PerspectiveCamera(45, 1.5, 1, 1000)

    this.camera.position.z = 5

    this.scene = new THREE.Scene()

    this.material = this.createMaterial()

    this.mesh = new THREE.Mesh(
      this.createPlane(),
      this.material,
    )

    this.scene.add(this.mesh)
    this.scene.add(this.camera)

    this.render(0)
  }

  render(t = 0) {
    requestAnimationFrame(this.render)
    this.material.uniforms.uTime.value += 0.01
    this.renderer.render(
      this.scene,
      this.camera,
    )
  }

  createMaterial() {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      }
    })
  }

  createPlane() {
    return new THREE.PlaneGeometry(10, 10, 1)
  }
}

customElements.define('x-lesanim', LesAnim)

/* eslint-env browser */
/* global PIXI */

// FYI, this is my first webComponent / custom element...

const fragmentShader = `
uniform float uTime;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main(){
  float sinT = sin(gl_FragCoord.x / 2.0 + uTime * 20.0);

  vec4 pixelData = texture2D(uSampler, vTextureCoord);

  float r = pixelData.r;
  float g = pixelData.g;
  float b = pixelData.b;
  float a = pixelData.a;
  
  gl_FragColor = vec4(
    r,
    g,
    b,
    a
  );
  
}

`

class LesAnim extends HTMLElement {
  constructor() {
    super()
    this.init = this.init.bind(this)
    this.initCanvas = this.initCanvas.bind(this)
    this.render = this.render.bind(this)
    const script = document.createElement('script')
    script.addEventListener('load', this.init)
    script.src = '//cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.0/pixi.min.js'
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(script)
  }

  init() {
    this.initStyles()
    this.initCanvas()
    this.initPixi()
    this.initShader()
    this.initText()
    this.initRender()
  }

  initStyles() {
    const style = document.createElement('style')
    style.textContent = `
      .canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `
    this.shadowRoot.appendChild(style)
  }

  initCanvas() {
    const c = document.createElement('canvas')
    c.classList.add('canvas')

    this.shadowRoot.appendChild(c)

    this.canvas = c
  }

  initPixi() {
    const {
      width,
      height,
    } = this.canvas.getBoundingClientRect()
    const app = new PIXI.Application({
      view: this.canvas,
      antialias: true,
      transparent: true,
      width,
      height,
    })
    app.renderer.autoResize = true
    this.pixiApp = app
  }

  initShader() {
    this.shaderUniforms = {
      uTime: {
        type: 'f',
        value: 0,
      },
    }
    this.shader = new PIXI.Filter('', fragmentShader, this.shaderUniforms)
  }

  initText() {
    const {
      width,
      height,
    } = this.canvas.getBoundingClientRect()
    const text = new PIXI.Text('Les.', {
      fontWeight: 'bold',
      fontSize: height,
      fontFamily: 'LeagueSpartan',
      fill: '#333',
      align: 'center',
      stroke: '#FFFFFF',
      strokeThickness: 6,
    })

    text.anchor.set(0)

    text.x = -11
    text.y = (height - text.height) + 40
    
    text.filters = [this.shader]
    this.text = text
    this.pixiApp.stage.addChild(text)
  }

  initRender() {
    this.render(0)
  }

  render(t = 0) {
    requestAnimationFrame(this.render)
    this.shader.uniforms.uTime += 0.01
    this.pixiApp.renderer.render(this.pixiApp.stage)
  }

}

customElements.define('x-lesanim', LesAnim)

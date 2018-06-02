/* eslint-env browser */
/* global PIXI */

// FYI, this is my first webComponent / custom element...

const fragmentShader = `
uniform float uTime;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
#define THRESH 0.2
void main() {
  vec2 coord = vec2(vTextureCoord.x + .25, vTextureCoord.y / 2.0 + .53) / 2.5;
  
  vec2 pointOne = vec2(0.59, sin(uTime - .5) / 15.0 + 0.25);
  vec2 pointTwo = vec2(.44, sin(uTime / 2.0 -.25) / 10.0 + 0.4);
  vec2 pointThree = vec2(.29, sin(uTime) / 15.0 + 0.25);
  vec2 pointFour = vec2(.14, sin(uTime + .5) / 10.0 + 0.4);
  vec2 pointFive = vec2(0.0, sin(uTime + .75) / 15.0 + 0.25);
  
  vec4 pixelData = texture2D(uSampler, vTextureCoord);

  float distOne = distance(coord.xy, pointOne);
  float distTwo = distance(coord.xy, pointTwo);
  float distThree = distance(coord.xy, pointThree);
  float distFour = distance(coord.xy, pointFour);
  float distFive = distance(coord.xy, pointFive);

  float rangeR = (
    distOne +
    distTwo +
    distThree
  ) / 4.0;

  float rangeG = (
    distTwo +
    distThree +
    distFour
  ) / 3.0;

  float rangeB = (
    distThree +
    distFour +
    distFive
  ) / 3.0;

  float r = rangeR > THRESH ? 1.0 : 0.3;
  float g = rangeG > THRESH ? 1.0 : 0.3;
  float b = rangeB > THRESH ? 1.0 : 0.3;
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
    this.render = this.render.bind(this)
    this.loadPixiScript = this.loadPixiScript.bind(this)
    this.initStyles = this.initStyles.bind(this)
    this.initCanvas = this.initCanvas.bind(this)
    this.initPixi = this.initPixi.bind(this)
    this.initShader = this.initShader.bind(this)
    this.initText = this.initText.bind(this)
    this.initRender = this.initRender.bind(this)
    this.init = this.init.bind(this)

    this.init()
  }

  loadPixiScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.addEventListener('load', resolve)

      const shadow = this.attachShadow({ mode: 'open' })
      shadow.appendChild(script)

      script.src = '//cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.0/pixi.min.js'
    })
  }

  async fetchFont() {
    await fetch('/static/fonts/LeagueSpartan-Bold.subset.eot')
    await fetch('/static/fonts/LeagueSpartan-Bold.subset.woff')
    await fetch('/static/fonts/LeagueSpartan-Bold.subset.ttf')
    return fetch('/static/fonts/LeagueSpartan-Bold.subset.svg')
  }

  async init() {
    await this.loadPixiScript()
    // await this.fetchFont()
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
      @keyframes fade {
        0% { opacity: 0 }
        100% { opacity: 1 }
      }

      .fade-in {
        animation: .3s .25s fade backwards ease-out;
      }

      .canvas {
        font-family: 'LeagueSpartan';
        font-weight: bolder;
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
    c.classList.add('fade-in')

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

    const textString = this.childNodes[0].textContent

    const text = new PIXI.Text(textString, {
      fontFamily: 'LeagueSpartan',
      fontWeight: 'bold',
      fontSize: height,
      fill: '#333',
      align: 'center',
      stroke: '#FFFFFF',
      strokeThickness: 0,
    })

    text.anchor.set(0)

    text.x = -10

    const offsetY = parseFloat(this.getAttribute('offsetY'), 10)

    if (offsetY) text.y = (height - text.height) + offsetY

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
    if (t > 1000 && t < 2000) this.text.dirty = true // hack for pixi font-loading carryon 
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.render)
  }
}

customElements.define('x-lesanim', LesAnim)

// TODO fallback for this, inject css into something somewhere and render text as normal?

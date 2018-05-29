/* eslint-env browser */
/* global PIXI */

// FYI, this is my first webComponent / custom element...

const fragmentShader = `
uniform float uTime;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {
  float sinT = sin(gl_FragCoord.x / 2.0 + uTime * 20.0);
  float cosT = cos(gl_FragCoord.x / 2.0 + uTime * 20.0);
  
  vec2 pointOne = vec2(-.5, sin(uTime - .5) / 5.0 + 0.6);
  vec2 pointTwo = vec2(.0, sin(uTime) / 5.0 + 0.4);
  vec2 pointThree = vec2(.5, sin(uTime + .5) / 5.0 + 0.6);
  
  vec4 pixelData = texture2D(uSampler, vTextureCoord);

  bool isWithinRange =
    distance(vTextureCoord.xy, pointOne) < sinT / 5.0 ||
    distance(vTextureCoord.xy, pointTwo) < cosT / 5.0 ||
    distance(vTextureCoord.xy, pointThree) < sinT / 5.0;

  float range = (
    distance(vTextureCoord.xy, pointOne) +
    distance(vTextureCoord.xy, pointTwo) +
    distance(vTextureCoord.xy, pointThree)
  ) / 3.0;

  float r = distance(vTextureCoord.xy, pointOne) > 0.5 ? 1.0 : 0.4;
  float g = distance(vTextureCoord.xy, pointTwo) > 0.5 ? 1.0 : 0.4;
  float b = distance(vTextureCoord.xy, pointThree) > 0.5 ? 1.0 : 0.4;
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
      @keyframes fade {
        0% { opacity: 0 }
        100% { opacity: 1 }
      }
    
      .fade-in {
        animation: .3s .25s fade backwards ease-out;
      }

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
    const text = new PIXI.Text('Les.', {
      fontWeight: 'bold',
      fontSize: height,
      fontFamily: 'LeagueSpartan',
      fill: '#333',
      align: 'center',
      stroke: '#FFFFFF',
      strokeThickness: 0,
    })

    text.anchor.set(0)

    text.x = -10
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

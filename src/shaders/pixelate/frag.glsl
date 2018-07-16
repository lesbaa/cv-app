#pragma glslify: snoise2 = require(glsl-noise/simplex/2d) 
#define noiseScale 50.0 
#define RADIUS 150.0 

precision mediump float;

varying vec2 vTextureCoord;
uniform vec2 uViewportResolution;
uniform sampler2D uSampler;
uniform float uTime;
uniform float uTransitionProgress;
uniform vec2 uMouse;


void main() {
  float normalisedTransissionProgress = (uTransitionProgress < 0.001)
    ? 0.001
    : uTransitionProgress;

  float tileSize = 2.5 / normalisedTransissionProgress;

  float numSqrs = 0.5 / tileSize;
  float aspectRatio = uViewportResolution.x / uViewportResolution.y;
  float u = floor( vTextureCoord.x / numSqrs ) * numSqrs;

  numSqrs = aspectRatio / tileSize;

  float v = floor( vTextureCoord.y / numSqrs ) * numSqrs;
  vec4 color = texture2D( uSampler, vec2( u, v ) );
  gl_FragColor = vec4(
    color.rgba
  );
}
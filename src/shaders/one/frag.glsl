#pragma glslify: snoise2 = require(glsl-noise/simplex/2d) 
#define noiseScale 50.0 
#define RADIUS 150.0 

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTime;
uniform float uTransitionProgress;
uniform vec2 uMouse;


void main() {
  // TODO this could maybe optimised to not call the noise function if not needed
  float noise = snoise2(vec2(gl_FragCoord.x, 10.0));
  float offset = mix(noise, 0.0, uTransitionProgress);
  bool mask = uTransitionProgress < noise * 4.0;

  vec4 color = texture2D(uSampler, vec2(vTextureCoord.x + offset, vTextureCoord.y + offset));

  float r = noise;
  float g = noise;
  float b = noise;
  float a = noise;
  
  gl_FragColor = vec4(
    r,
    g,
    b,
    a
  );
}
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
  float noise = snoise2(vec2(gl_FragCoord.x / 40.0, 0.0));

  float offset;
  float num = -1.0;


  for (int i = 0; i <= 10; i++) {
    num += 0.21;
    if (noise > num) {
      offset = num * uTransitionProgress;
    }
  }

  vec4 originalColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + offset));

  float r = originalColor.r;
  float g = originalColor.g;
  float b = originalColor.b;
  float a = originalColor.a != 0.0 ? mix(1.0, 0.0, abs(uTransitionProgress)): 0.0;
  
  gl_FragColor = vec4(
    r,
    g,
    b,
    a
  );
}
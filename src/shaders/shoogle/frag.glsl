#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#define noiseScale 50.0 
#define RADIUS 150.0 

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTime;


void main() {
  vec2 glTextureCoord = normalize(2.0 * vTextureCoord - 0.5);
  float offset = snoise3(vec3(gl_FragCoord.xy / 100.0, uTime * 2.0)) / 50.0;
  vec2 vOffset = glTextureCoord * offset;

  vec4 color = texture2D(uSampler, vec2(vTextureCoord.x + vOffset.x, vTextureCoord.y + vOffset.y));

  float r = color.r;
  float g = color.g;
  float b = color.b;
  float a = color.a;
  
  gl_FragColor = vec4(
    r,
    g,
    b,
    a
  );
}
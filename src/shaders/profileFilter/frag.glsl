#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#define noiseScale 50.0 
#define RADIUS 150.0 

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSamplerTwo;
uniform float uTime;
uniform float uMouseSpeed;


void main() {
  // TODO this could maybe optimised to not call the noise function if not needed
  float normalisedTime = uTime / 4.0 + uMouseSpeed;

  vec4 videoColor = texture2D(uSamplerTwo, vTextureCoord.xy);
  vec4 color = texture2D(uSampler, vTextureCoord.xy);

  float r = snoise3(vec3(gl_FragCoord.xy / 100.0, normalisedTime)) > 0.3 ? 1.0 : 0.5;
  float g = snoise3(vec3(gl_FragCoord.xy / 100.0, normalisedTime + 100.0)) > 0.3 ? 1.0 : 0.5;
  float b = snoise3(vec3(gl_FragCoord.xy / 100.0, normalisedTime + 200.0)) > 0.3 ? 1.0 : 0.5;
  float a = color.a;
  
  gl_FragColor = vec4(
    color.r > 0.99 ? videoColor.r : r,
    color.g > 0.99 ? videoColor.g : g,
    color.b > 0.99 ? videoColor.b : b,
    a
  );

}
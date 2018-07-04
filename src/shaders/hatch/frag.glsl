#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#define noiseScale 150.0 

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTime;


void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);

  // TODO this could maybe optimised to not call the noise function if not needed
  float r = snoise3(vec3(gl_FragCoord.xy / noiseScale, uTime + 1000.0));
  float g = snoise3(vec3(gl_FragCoord.xy / noiseScale, uTime + 2000.0));
  float b = snoise3(vec3(gl_FragCoord.xy / noiseScale, uTime));

  float sinCoord = sin(gl_FragCoord.x + gl_FragCoord.y);

  float a = color.a * (sinCoord + r + g + b) / 1.5;
  
  gl_FragColor = vec4(
    r > 0.3 ? 0.4 : 0.0,
    g > 0.3 ? 0.4 : 0.0,
    b > 0.3 ? 0.4 : 0.0,
    a > 0.4 ? 0.4 : 0.0
  );
}
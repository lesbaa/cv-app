precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTime;

void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);

  float x = gl_FragCoord.x + (uTime * 50.0);
  float y = gl_FragCoord.y;
  float sinCoord = sin(x + y);

  vec4 color_offset = texture2D(uSampler, vTextureCoord - 0.0025);
  float x_two = gl_FragCoord.x - (uTime * 50.0);
  float sinCoord_two = sin(x_two - y);

  float a_one = sinCoord * color.a;
  float a_two = sinCoord_two * color_offset.a;

  gl_FragColor = vec4(
    color.rgb,
    max(a_one, a_two)
  );
}
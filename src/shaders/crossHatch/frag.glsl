// credit where credit is due...
// this is nabbed from https://github.com/pixijs/pixi-filters/blob/master/filters/cross-hatch/src/crosshatch.frag
precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void)
{
    vec4 color = texture2D(uSampler, vTextureCoord.xy);
    float lum = length(color.rgb);

    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

    if (lum < 1.00)
    {
        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, color.a);
        }
    }

    if (lum < 0.75)
    {
        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, color.a);
        }
    }

    if (lum < 0.50)
    {
        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, color.a);
        }
    }

    if (lum < 0.3)
    {
        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, color.a);
        }
    }

    if (color.a == 0.0)
    {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}
module.exports = {
  webpack: (config) => {
    config.module.rules.push(
      { test: /\.(glsl|frag|vert)$/, use: { loader: 'raw-loader' }, exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, use: { loader: 'glslify-loader' }, exclude: /node_modules/ },
    )
    return config
  },
}

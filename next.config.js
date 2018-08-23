
module.exports = {
  webpack: (config) => {
    // the following is to allow the modules to access their filename for links
    config.context = __dirname // eslint-disable-line no-param-reassign
    config.node = { // eslint-disable-line no-param-reassign
      ...config.node,
      __filename: true,
    }
    config.module.rules.push(
      { test: /\.(glsl|frag|vert)$/, use: { loader: 'raw-loader' }, exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, use: { loader: 'glslify-loader' }, exclude: /node_modules/ },
    )
    return config
  },
}

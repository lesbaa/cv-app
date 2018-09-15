const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
  webpack: (config, { dev }) => {
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
    if (!dev) {
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          filename: 'sw.js',
          verbose: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          staticFileGlobs: [
            'static/fonts',
            'static/img/**.*',
            'static/img/**/*',
          ],
          runtimeCaching: [
            {
              handler: 'networkFirst',
              urlPattern: /^https?.*/,
            },
          ],
        })
      )
    }
    return config
  },
}

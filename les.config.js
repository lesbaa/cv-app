/* global window */
module.exports = () => {
  if (process.browser) {
    return window.env
  }

  return {
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL: process.env.API_BASE_URL,
  }
}

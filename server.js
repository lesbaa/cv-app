const express = require('express')
const serveStatic = require('serve-static')
const nextApp = require('next')
const compression = require('compression')
const PORT = require('./server/metro.server.config').expressPort || process.env.port || 8080
const { BASE_SECTION_ROUTES } = require('./server/metro.routing.config')
const handleEmbedIframe = require('./server/lib/handle-embed-iframe')
const getSectionId = require('./server/lib/get-section-id')
const getCustomApiNum = require('./server/lib/get-custom-api-num')

// These are only used in a dev environment

process.env.port = PORT

const dev =
  process.env.NODE_ENV === 'local' ||
  process.env.NODE_ENV === 'stv3'

const useLocalHttps = Boolean(process.env.LOCAL_HTTPS)
const useReduxDevTools = process.env.USE_REDUX_DEVTOOLS === '1'
const app = nextApp({ dev })
const handle = app.getRequestHandler()

const routeHandler = (req, res, next, pagePath) => {
  const {
    hostname,
    originalUrl,
    protocol,
    query,
    params: requestParams,
  } = req
  let {
    baseSection,
    subSection,
    guid: paramGuid,
  } = requestParams

  const apiTpNumber = getCustomApiNum(query, process.env.NODE_ENV)
  const {
    guid: queryGuid,
    clearcache,
    throwError,
  } = query

  const baseSectionDoesNotExistAsRoute = !BASE_SECTION_ROUTES.includes(baseSection)

  if (!requestParams || baseSectionDoesNotExistAsRoute) return next()

  const { parentSection } = getSectionId(subSection || baseSection)

  const newQuery = {
    baseSection,
    subSection,
    parentSection,
    ...(useReduxDevTools && { useReduxDevTools }),
    guid: paramGuid || queryGuid,
    environment: process.env.NODE_ENV,
    ...(clearcache && { clearcache }),
    env: process.env.NODE_ENV,
    baseUrl: [protocol, '://', hostname, PORT ? `:${PORT}` : '', originalUrl].join(''),
    path: originalUrl,
    apiTpNumber,
    throwError,
  }


  const additionalQueryParams = { ...query, ...newQuery }
  const isWeatherRoute = baseSection === 'weather'
  const isErrorRoute = subSection === 'invoke-error'

  let page = pagePath

  if (isWeatherRoute) {
    page = '/weather'
  }
  if (isErrorRoute) {
    page = '/invoke-error'
  }

  app.render(req, res, page, additionalQueryParams)
}

const server = express()

server.use(compression())
// gzip all requests

// the static assets
server.use(
  '/news/fonts',
  serveStatic('static/fonts', {
    fallthrough: true,
    maxAge: 31536000,
  })
)
server.use(
  '/news/',
  serveStatic('static/', {
    fallthrough: true,
    maxAge: 86400,
  })
)

app.prepare().then(() => {
  server.get('/news/utils/embed-iframe', handleEmbedIframe)

  server.get(
    ['/:baseSection/:subSection', '/:baseSection'],
    (req, res, next) => routeHandler(req, res, next, '/index')
  )

  server.get(
    '/:baseSection/:subSection/:guid',
    (req, res, next) => routeHandler(req, res, next, '/article')
  )

  // TODO this will change when assetPrefix support is added
  server.get('*', (req, res) => handle(req, res))

  if (useLocalHttps && dev) {
    const fs = require('fs')
    const https = require('https')
    const privateKey = fs.readFileSync('server/dev-https/metro.dev.key', 'utf8')
    const certificate = fs.readFileSync('server/dev-https/metro.dev.crt', 'utf8')
    const credentials = { key: privateKey, cert: certificate }
    const httpsServer = https.createServer(credentials, server)
    httpsServer.listen(PORT)
  } else {
    server.listen(PORT)
  }

  console.log(`Server running on ** ${process.env.NODE_ENV} ** environment and on port: ${PORT}`)
})
/* eslint-env node */
const express = require('express')
const lru = require('lru-cache')
const serveStatic = require('serve-static')
const nextApp = require('next')
const http2 = require('spdy')
const compression = require('compression')
const isMobile = require('is-mobile')
const handleCalender = require('./server/handleCalender')
const logListener = require('./server/logListener')

const cache = lru({
  max: 1e10,
  length: (entry, key) => entry.length,
})

const PORT = process.env.PORT || 8080
process.env.PORT = PORT

const dev =
  process.env.LES_ENV === 'dev' ||
  process.env.LES_ENV !== 'live'

const app = nextApp({ dev })

const handle = app.getRequestHandler()

const server = express()

server.use(compression())
// gzip all requests

// the static assets
server.use(
  '/static/fonts',
  serveStatic('static/fonts', {
    fallthrough: true,
    maxAge: 31536000,
  })
)

server.use(
  '/static',
  serveStatic('static', {
    fallthrough: true,
    maxAge: 86400,
  })
)

server.get('/calender', handleCalender)

app.prepare().then(() => {
  // TODO, this stuff could be a bit DRYer
  server.get('*', async (req, res, next) => {
    if (isMobile(req) && !req.path.includes('_next')) {
      const cached = cache.get(req.originalUrl)
      if (cached && req.query.nocache !== 'true' && !dev) {
        res.set('X-cache', 'hit')
        res.send(cached)
        return
      }

      const markup = await app.renderToHTML(req, res, '/mobile', { ...req.query })
      cache.set(req.originalUrl, markup)
      res.send(markup)
    }
    next()
  })

  server.get('/', async (req, res, next) => {
    const cached = cache.get(req.originalUrl)
    if (cached && req.query.nocache !== 'true' && !dev) {
      res.set('X-cache', 'hit')
      res.send(cached)
      return
    }

    const markup = await app.renderToHTML(req, res, '/index', { ...req.query })
    cache.set(req.originalUrl, markup)
    res.send(markup)
  })

  server.get('/cv', async (req, res, next) => {
    const cached = cache.get(req.originalUrl)

    if (cached && req.query.nocache !== 'true' && !dev) {
      res.set('X-cache', 'hit')
      res.send(cached)
      return
    }

    const markup = await app.renderToHTML(req, res, '/CVSlide', { ...req.query, slidename: 'hello' })

    cache.set(req.originalUrl, markup)
    res.send(markup)
  })

  server.get('/cv/:slidename', async (req, res, next) => {
    const cached = cache.get(req.originalUrl)
    if (cached && req.query.nocache !== 'true' && !dev) {
      res.set('X-cache', 'hit')
      res.send(cached)
      return
    }

    const { slidename } = req.params
    const markup = await app.renderToHTML(req, res, '/CVSlide', { ...req.query, slidename })

    cache.set(req.originalUrl, markup)
    res.send(markup)
  })

  console.log(`Server running on ** ${process.env.NODE_ENV} ** environment and on port: ${PORT}`)

  const fs = require('fs')

  const cert = fs.readFileSync('server/dev-https/lescv.dev.crt', 'utf-8')
  const key = fs.readFileSync('server/dev-https/lescv.dev.key', 'utf-8')

  const options = {
    key,
    cert,
  }

  server.get('*', handle)

  if (dev) {
    http2
      .createServer(options, server)
      .listen(PORT, logListener('HTTP/2'))
  } else {
    server.listen(PORT, logListener('HTTP'))
  }
})

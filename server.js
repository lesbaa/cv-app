/* eslint-env node */
const express = require('express')
const { join } = require('path')
const lru = require('lru-cache')
const serveStatic = require('serve-static')
const nextApp = require('next')
const https = require('https')
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

const nextAppHandler = pageComponentPath => async (req, res, next, UAIsMobile = false) => {
  const cached = cache.get(req.originalUrl)
  if (cached && req.query.nocache !== 'true' && !dev) {
    res.set('X-cache', 'hit')
    res.send(cached)
    return
  }

  const { slidename = 'hello' } = req.params
  const markup = await app.renderToHTML(
    req,
    res,
    pageComponentPath,
    {
      ...req.query,
      slidename,
    }
  )

  cache.set(req.originalUrl + UAIsMobile, markup)
  if (req.query && req.query.ref && !req.cookies) res.cookie('LES_REF', req.query.ref)
  res.send(markup)
}


app.prepare().then(() => {
  server.use('/sw.js', (req, res) => {
    const path = join(__dirname, '.next', 'sw.js')
    return serveStatic(path, {
      fallthrough: true,
      maxAge: 86400,
    })
  })

  server.get('*', (req, res, next) => {
    if (isMobile(req) && !req.path.includes('_next')) {
      return nextAppHandler('/mobile')(req, res, next, true)
    }
    return next()
  })

  server.get('/', nextAppHandler('/index'))
  server.get('/cv', nextAppHandler('/CVSlide'))
  server.get('/cv/:slidename', nextAppHandler('/CVSlide'))

  console.log(`Server running on ** ${process.env.NODE_ENV} ** environment and on port: ${PORT}`)

  server.get('*', handle)

  if (dev) {
    const fs = require('fs')

    const cert = fs.readFileSync('server/dev-https/lescv.dev.crt', 'utf-8')
    const key = fs.readFileSync('server/dev-https/lescv.dev.key', 'utf-8')

    const options = {
      key,
      cert,
      // protocols: ['http/1.1'],
    }

    https
      .createServer(options, server)
      .listen(PORT, logListener('HTTP/2'))
  } else {
    server.listen(PORT, logListener('HTTP'))
  }
})

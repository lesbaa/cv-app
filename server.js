/* eslint-env node */
const express = require('express')
const { join } = require('path')
const Lru = require('lru-cache')
const serveStatic = require('serve-static')
const nextApp = require('next')
const https = require('https')
const compression = require('compression')
const isMobile = require('is-mobile')
const handleCalender = require('./server/handleCalender')
const logListener = require('./server/logListener')

const cache = new Lru({
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
  const cached = cache.get(req.originalUrl + UAIsMobile)
  const t = process.hrtime()


  if (cached && req.query.nocache !== 'true') {
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
  server.use('/sw.js',
    serveStatic('.next/sw.js', {
      fallthrough: false,
      maxAge: 86400,
    })
  )

  server.get('*', (req, res, next) => {
    if (isMobile(req) && !req.path.includes('_next')) {
      return nextAppHandler('/mobile')(req, res, next, true)
    }
    return next()
  })

  server.get('/', nextAppHandler('/index'))
  server.get('/cv/:slidename', nextAppHandler('/CVSlide'))
  server.get('/cv/', nextAppHandler('/CVSlide'))

  console.log(`Server running on ** ${process.env.NODE_ENV} ** environment and on port: ${PORT}`)

  server.get('*', handle)
  server.get('/_next', handle)

  server.listen(PORT, logListener('HTTP'))
})

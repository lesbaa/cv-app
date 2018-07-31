/* eslint-env node */
const express = require('express')
const lru = require('lru-cache')
const serveStatic = require('serve-static')
const nextApp = require('next')
const http2 = require('spdy')
const compression = require('compression')

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


const useReduxDevTools = process.env.USE_REDUX_DEVTOOLS === '1'
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

// const docHead = `
// <!DOCTYPE html>
// <html>
// <head>
// </head>
// <body>
// <h1>Hiya!</h1>
// `
// TODO push fonts, main.js, commons.js etc
// server.get('*', (req, res, nxt) => {
//   res.on('push', console.log)
//   res.write(docHead)
//   const stream = res.push('static/test.js', {
//     status: 200, // optional
//     method: 'GET', // optional
//     request: {
//       accept: '*/*',
//     },
//     response: {
//       'content-type': 'application/javascript',
//     },
//   })

//   stream.on('error', (err) => {
//     console.log('push error!')
//   })
  
//   const data = fs.readFileSync('static/test.js', 'utf-8')
//   stream.end(data)

//   res.end('<script src="static/test.js"></script>')

// })

app.prepare().then(() => {
  // TODO, this stuff could be a bit DRYer
  server.get('/', async (req, res, next) => {
    const cached = cache.get(req.originalUrl)
    if (cached) {
      res.set('X-lru', 'hit')
      res.send(cached)
      return
    }

    const markup = await app.renderToHTML(req, res, '/index', { ...req.query })
    console.log(markup)
    cache.set(req.originalUrl, markup)
    res.send(markup)
  })

  server.get('/cv', async (req, res, next) => {
    const cached = cache.get(req.originalUrl)
    if (cached) {
      res.set('X-lru', 'hit')
      res.send(cached)
      return
    }

    const markup = await app.renderToHTML(req, res, '/CVSlide', { ...req.query, slidename: 'hello' })

    cache.set(req.originalUrl, markup)
    res.send(markup)
  })

  server.get('/cv/:slidename', async (req, res, next) => {
    const cached = cache.get(req.originalUrl)
    if (cached) {
      res.set('X-lru', 'hit')
      res.send(cached)
      return
    }

    const { slidename } = req.params
    const markup = await app.renderToHTML(req, res, '/CVSlide', { ...req.query, slidename })

    cache.set(req.originalUrl, markup)
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

  http2
    .createServer(options, server)
    .listen(PORT, logListener('HTTP/2'))
})
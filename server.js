/* eslint-env node */
const express = require('express')
const serveStatic = require('serve-static')
const nextApp = require('next')
const http2 = require('http2')
const compression = require('compression')

const logListener = require('./server/logListener')

const PORT = process.env.PORT || 8080
process.env.PORT = PORT

console.log(PORT)

const dev =
  process.env.NODE_ENV === 'dev' ||
  process.env.NODE_ENV !== 'live'


const useReduxDevTools = process.env.USE_REDUX_DEVTOOLS === '1'
// const app = nextApp({ dev })

// const handle = app.getRequestHandler()

// const routeHandler = (req, res, next, pagePath) => {
//   app.render(req, res, pagePath, additionalQueryParams)
// }

const server = express()

// server.use(compression())
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

const docHead = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<h1>Hiya!</h1>
`

server.get('/hey', (rq, rs, nxt) => {
  rq.on('push', console.log)
  rs.write(docHead)
  const stream = rs.push('static/test.js', {
    status: 200, // optional
    method: 'GET', // optional
    request: {
      accept: '*/*',
    },
    response: {
      'content-type': 'application/javascript',
    },
  })

  stream.on('error', (err) => {
    console.log('push error!', err)
  })

  stream.end('<script src="static/test.js"></script>')

  rs.end('<script src="static/test.js"></script><img src="//lorempixel.com/200/200"></body></html>')

})

// app.prepare().then(() => {
console.log(`Server running on ** ${process.env.NODE_ENV} ** environment and on port: ${PORT}`)

const fs = require('fs')

const cert = fs.readFileSync('server/dev-https/lescv.dev.crt', 'utf-8')
const key = fs.readFileSync('server/dev-https/lescv.dev.key', 'utf-8')

const options = {
  key,
  cert,
}

http2
  .createSecureServer(options, server)
  .listen(PORT, logListener('HTTP/2'))

// })
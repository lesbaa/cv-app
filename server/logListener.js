const logListener = protocol => (err) => {
  console.info('Starting server...')
  console.info('==================')
  console.info(`Protocol: ** ${protocol} **`)
  console.info(`Environment: ** ${process.env.LES_ENV} **`)
  console.info(`Port: ** ${process.env.PORT} **\n`)
  if (err) {
    console.log(`ERROR STARTING SERVER ON ${protocol}:\n`, err)
    process.exit(1)
  }
}

module.exports = logListener
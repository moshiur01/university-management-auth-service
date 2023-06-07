import mongoose from 'mongoose'
import config from './config'
import app from './app'
import { logger, ErrorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  ErrorLogger.error(error)
  process.exit(1)
})

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM  is received')
//   if (server) {
//     server.close()
//   }
// })

async function main() {
  let server: Server
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('DB Connection Done')

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    ErrorLogger.error(error)
  }

  process.on('unhandledRejection', error => {
    console.log('UnhandedRejection is detected, we are closing our server.....')
    if (server) {
      server.close(() => {
        ErrorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()

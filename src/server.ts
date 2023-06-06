import mongoose from 'mongoose'

import config from './config'
import app from './app'
import { logger, ErrorLogger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('DB Connection Done')

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    ErrorLogger.error(error)
  }
}

main()

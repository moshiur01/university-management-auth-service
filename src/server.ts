import mongoose from 'mongoose'

import config from './config'
import app from './app'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('DB Connection Done')

    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

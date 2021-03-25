import 'source-map-support/register'

import { app } from './app'
import { getLogger } from './logger'

const logger = getLogger('server')

app.listen(process.env.PORT || 8080, () => {
  logger.info('started')
})

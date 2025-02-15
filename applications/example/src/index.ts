import { Logger, LogLevel } from '@packages/logger'

const logger = new Logger({
	application: 'example',
	logLevel: LogLevel.WARN,
	exactLevelMode: true,
})

const object = {
	isLogger: true,
}

const error = new Error('someone error')

logger.log(process.env.HELLO_WORLD as string, object)
logger.debug(process.env.HELLO_WORLD as string, object)
logger.warn(process.env.HELLO_WORLD as string, error)
logger.error(process.env.HELLO_WORLD as string, error)

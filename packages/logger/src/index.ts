import chalk from 'chalk'

const LogLevel = {
	LOG: 20,
	DEBUG: 40,
	WARN: 60,
	ERROR: 80,
	FATAL: 100,
} as const

interface LoggerOptions {
	application?: string
	logLevel?: (typeof LogLevel)[keyof typeof LogLevel]
	exactLevelMode?: boolean
}

class Logger {
	constructor(private readonly options: LoggerOptions = {}) {}

	public log(...args: unknown[]): void {
		if (!this.shouldBeLog(LogLevel.LOG)) {
			return
		}

		console.log(...this.formatLog(chalk.green('[LOG]'), ...args))
	}

	public debug(...args: unknown[]): void {
		if (!this.shouldBeLog(LogLevel.DEBUG)) {
			return
		}

		console.log(...this.formatLog(chalk.blue('[DEBUG]'), ...args))
	}

	public warn(...args: unknown[]): void {
		if (!this.shouldBeLog(LogLevel.WARN)) {
			return
		}

		console.log(...this.formatLog(chalk.yellow('[WARN]'), ...args))
	}

	public error(...args: unknown[]): void {
		if (!this.shouldBeLog(LogLevel.ERROR)) {
			return
		}

		console.log(...this.formatLog(chalk.red('[ERROR]'), ...args))
	}

	public fatal(...args: unknown[]): void {
		if (!this.shouldBeLog(LogLevel.FATAL)) {
			return
		}

		console.log(...this.formatLog(chalk.redBright('[FATAL]'), ...args))
	}

	private shouldBeLog(level: (typeof LogLevel)[keyof typeof LogLevel]): boolean {
		const logLevel = this.options.logLevel ?? LogLevel.LOG

		if (this.options.exactLevelMode) {
			return level === logLevel
		}

		return level >= logLevel
	}

	private formatLog(levelLabel: string, ...args: unknown[]): unknown[] {
		const application = this.options.application
			? chalk.cyan(`[${this.options.application}] `)
			: ''
		const time = this.getTime()

		return [`${application}${levelLabel} ${time}`, ...args]
	}

	private getTime(): string {
		const date = new Date()

		const from = `${chalk.whiteBright('from')} ${chalk.yellow(date.toLocaleDateString())}`
		const at = `${chalk.whiteBright('at')} ${chalk.yellowBright(date.toLocaleTimeString())}`

		return `${from} ${at}`
	}
}

export { Logger, LogLevel, type LoggerOptions }

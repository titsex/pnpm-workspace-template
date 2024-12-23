import chalk from 'chalk'

interface LoggerOptions {
	application: string
}

class Logger {
	constructor(private readonly options: LoggerOptions) {}

	public log(...args: unknown[]): void {
		console.log(
			chalk.cyan(`[${this.options.application}]`),
			chalk.green('[LOG]'),
			this.getTime(),
			':',
			...args
		)
	}

	public debug(...args: unknown[]): void {
		console.log(
			chalk.cyan(`[${this.options.application}]`),
			chalk.blue('[DEBUG]'),
			this.getTime(),
			':',
			...args
		)
	}

	public warn(...args: unknown[]): void {
		console.log(
			chalk.cyan(`[${this.options.application}]`),
			chalk.yellow('[WARN]'),
			this.getTime(),
			':',
			...args
		)
	}

	public error(...args: unknown[]): void {
		console.log(
			chalk.cyan(`[${this.options.application}]`),
			chalk.red('[ERROR]'),
			this.getTime(),
			':',
			...args
		)
	}

	private getTime(): string {
		const date = new Date()

		const from = `${chalk.whiteBright('from')} ${chalk.yellow(date.toLocaleDateString())}`
		const at = `${chalk.whiteBright('at')} ${chalk.yellowBright(date.toLocaleTimeString())}`

		return `${from} ${at}`
	}
}

export { Logger, type LoggerOptions }

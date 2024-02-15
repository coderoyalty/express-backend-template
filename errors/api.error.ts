class APIError extends Error {
	statusCode: number;
	constructor(
		message: string,
		statusCode?: number,
		public data?: Record<string, any>,
	) {
		super(message);
		this.statusCode = statusCode || 500;
	}
}

export default APIError;

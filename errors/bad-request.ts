import APIError from "./api.error";

export default class BadRequestError extends APIError {
	constructor(message: string, data?: Record<string, any>) {
		super(message, 400, data);
	}
}

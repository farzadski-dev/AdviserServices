const {
	ERROR,
	FAILED,
} = require('./../controllers/Error/services/ErrorTemplates');

class BaseError extends Error {
	constructor(message, statusCode, ERROR_NAME) {
		super(message);
		this.message = message;
		this.errorMessage = message;
		this.statusCode = statusCode;
		this.isOperational = true;
		this.status = `${statusCode}`.startsWith('4') ? FAILED : ERROR;
		this.name = ERROR_NAME;
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = BaseError;

const BaseError = require('../../core/BaseError');

const {
	NOT_LOGGED_IN,
	MY_CUSTOM_EXCEPTION,
} = require('../../controllers/Error/services/ErrorTemplates');

class NotLoggedInException extends BaseError {
	constructor(message = NOT_LOGGED_IN, statusCode = 401) {
		super(message, statusCode, MY_CUSTOM_EXCEPTION);
	}
}

module.exports = NotLoggedInException;

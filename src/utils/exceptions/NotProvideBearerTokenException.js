const BaseError = require('../../core/BaseError');

const {
	NOT_PROVIDE_BEARER_TOKEN,
	MY_CUSTOM_EXCEPTION,
} = require('../../controllers/Error/services/ErrorTemplates');

class NotProvideBearerTokenException extends BaseError {
	constructor(message = NOT_PROVIDE_BEARER_TOKEN, statusCode = 400) {
		super(message, statusCode, MY_CUSTOM_EXCEPTION);
	}
}

module.exports = NotProvideBearerTokenException;

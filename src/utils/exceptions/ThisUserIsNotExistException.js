const BaseError = require('../../core/BaseError');

const {
	USER_NOT_EXIST,
	MY_CUSTOM_EXCEPTION,
} = require('../../controllers/Error/services/ErrorTemplates');

class ThisUserIsNotExistException extends BaseError {
	constructor(message = USER_NOT_EXIST, statusCode = 404) {
		super(message, statusCode, MY_CUSTOM_EXCEPTION);
	}
}

module.exports = ThisUserIsNotExistException;

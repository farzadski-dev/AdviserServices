const BaseError = require('../../../core/BaseError');

const {
	PASSWORD_MUST_BE_8_120_CHARACTERS_LONG,
	MY_CUSTOM_EXCEPTION,
} = require('../../../controllers/Error/services/ErrorTemplates');

class PasswordLengthValidationException extends BaseError {
	constructor(
		message = PASSWORD_MUST_BE_8_120_CHARACTERS_LONG,
		statusCode = 400
	) {
		super(message, statusCode, MY_CUSTOM_EXCEPTION);
	}
}

module.exports = PasswordLengthValidationException;

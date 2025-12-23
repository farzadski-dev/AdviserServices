const BaseError = require('../../../core/BaseError');

const {
	PASSWORD_MUST_HAVE_AT_LEAST_ONE_LOWERCASE_CHARACTER,
	MY_CUSTOM_EXCEPTION,
} = require('../../../controllers/Error/services/ErrorTemplates');

class PasswordContainsLowercaseValidationException extends BaseError {
	constructor(
		message = PASSWORD_MUST_HAVE_AT_LEAST_ONE_LOWERCASE_CHARACTER,
		statusCode = 400
	) {
		super(message, statusCode, MY_CUSTOM_EXCEPTION);
	}
}

module.exports = PasswordContainsLowercaseValidationException;

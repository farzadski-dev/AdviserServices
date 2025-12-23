const BaseError = require('../../../core/BaseError');

const {
	PASSWORD_MUST_HAVE_AT_LEAST_ONE_UPPERCASE_CHARACTER,
	MY_CUSTOM_EXCEPTION,
} = require('../../../controllers/Error/services/ErrorTemplates');

class PasswordContainsUppercaseValidationException extends BaseError {
	constructor(
		message = PASSWORD_MUST_HAVE_AT_LEAST_ONE_UPPERCASE_CHARACTER,
		statusCode = 400
	) {
		super(message, statusCode, MY_CUSTOM_EXCEPTION);
	}
}

module.exports = PasswordContainsUppercaseValidationException;

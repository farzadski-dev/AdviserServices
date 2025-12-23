const BaseError = require('../../../core/BaseError');

const {
	PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_DIGIT,
	MY_CUSTOM_EXCEPTION,
} = require('../../../controllers/Error/services/ErrorTemplates');

class PasswordContainsNumberValidationException extends BaseError {
	constructor(
		message = PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_DIGIT,
		statusCode = 400
	) {
		super(message, statusCode, MY_CUSTOM_EXCEPTION);
	}
}

module.exports = PasswordContainsNumberValidationException;

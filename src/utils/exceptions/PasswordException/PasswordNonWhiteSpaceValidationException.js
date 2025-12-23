const BaseError = require('../../../core/BaseError');

const {
	PASSWORD_MUST_NOT_CONTAIN_WHITE_SPACES,
	MY_CUSTOM_EXCEPTION,
} = require('../../../controllers/Error/services/ErrorTemplates');

class PasswordNonWhiteSpaceValidationException extends BaseError {
	constructor(
		message = PASSWORD_MUST_NOT_CONTAIN_WHITE_SPACES,
		statusCode = 400
	) {
		super(message, statusCode, MY_CUSTOM_EXCEPTION);
	}
}

module.exports = PasswordNonWhiteSpaceValidationException;

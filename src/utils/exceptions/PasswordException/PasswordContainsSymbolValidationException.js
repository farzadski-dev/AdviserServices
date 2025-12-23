const BaseError = require('../../../core/BaseError');

const {
	PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_SPECIAL_SYMBOL,
	MY_CUSTOM_EXCEPTION,
} = require('../../../controllers/Error/services/ErrorTemplates');

class PasswordContainsSymbolValidationException extends BaseError {
	constructor(
		message = PASSWORD_MUST_CONTAIN_AT_LEAST_ONE_SPECIAL_SYMBOL,
		statusCode = 400
	) {
		super(message, statusCode, MY_CUSTOM_EXCEPTION);
	}
}

module.exports = PasswordContainsSymbolValidationException;

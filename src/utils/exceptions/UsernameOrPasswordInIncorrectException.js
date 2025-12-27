const BaseError = require("../../core/BaseError"),
	{
		THIS_USERNAME_OR_PASSWORD_IS_INCORRECT,
		MY_CUSTOM_EXCEPTION,
	} = require("../../controllers/Error/services/ErrorTemplates");

class UsernameOrPasswordInIncorrectException extends BaseError {
	constructor(
		message = THIS_USERNAME_OR_PASSWORD_IS_INCORRECT,
		statusCode = 401,
	) {
		super(message, statusCode, MY_CUSTOM_EXCEPTION);
	}
}

module.exports = UsernameOrPasswordInIncorrectException;

const { PasswordLengthValidationException } = require('../../utils/exceptions');

class PasswordLengthValidation {
	static validate(password) {
		const isValidLength = /^.*(?=.{8,120})/;
		if (!isValidLength.test(password))
			throw new PasswordLengthValidationException();
	}
}

module.exports = PasswordLengthValidation;

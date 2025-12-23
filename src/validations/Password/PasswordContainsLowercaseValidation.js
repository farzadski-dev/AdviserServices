const {
	PasswordContainsLowercaseValidationException,
} = require('../../utils/exceptions');

class PasswordContainsLowercaseValidation {
	static validate(password) {
		const isContainsLowercase = /(?=.*[a-z])/;
		if (!isContainsLowercase.test(password))
			throw new PasswordContainsLowercaseValidationException();
	}
}

module.exports = PasswordContainsLowercaseValidation;

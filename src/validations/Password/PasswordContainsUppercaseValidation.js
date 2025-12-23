const {
	PasswordContainsUppercaseValidationException,
} = require('../../utils/exceptions');

class PasswordContainsUppercaseValidation {
	static validate(password) {
		const isContainsUppercase = /^(?=.*[A-Z]).*$/;
		if (!isContainsUppercase.test(password))
			throw new PasswordContainsUppercaseValidationException();
	}
}

module.exports = PasswordContainsUppercaseValidation;

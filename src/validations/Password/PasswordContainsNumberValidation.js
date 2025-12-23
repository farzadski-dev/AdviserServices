const {
	PasswordContainsNumberValidationException,
} = require('../../utils/exceptions');

class PasswordContainsNumberValidation {
	static validate(password) {
		const isContainsNumber = /^(?=.*\d).*$/;
		if (!isContainsNumber.test(password))
			throw new PasswordContainsNumberValidationException();
	}
}

module.exports = PasswordContainsNumberValidation;

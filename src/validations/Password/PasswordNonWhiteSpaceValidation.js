const {
	PasswordNonWhiteSpaceValidationException,
} = require('../../utils/exceptions');

class PasswordNonWhiteSpaceValidation {
	static validate(password) {
		const isNonWhiteSpace = /^\S*$/;
		if (!isNonWhiteSpace.test(password))
			throw new PasswordNonWhiteSpaceValidationException();
	}
}

module.exports = PasswordNonWhiteSpaceValidation;

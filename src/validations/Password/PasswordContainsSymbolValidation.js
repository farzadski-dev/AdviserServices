const {
	PasswordContainsSymbolValidationException,
} = require('../../utils/exceptions');

class PasswordContainsSymbolValidation {
	static validate(password) {
		const isContainsSymbol =
			/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
		if (!isContainsSymbol.test(password))
			throw new PasswordContainsSymbolValidationException();
	}
}

module.exports = PasswordContainsSymbolValidation;

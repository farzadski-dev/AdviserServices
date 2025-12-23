const PasswordLengthValidation = require("./PasswordLengthValidation");
const PasswordNonWhiteSpaceValidation = require("./PasswordNonWhiteSpaceValidation");
const PasswordContainsLowercaseValidation = require("./PasswordContainsLowercaseValidation");
const PasswordContainsUppercaseValidation = require("./PasswordContainsUppercaseValidation");
const PasswordContainsNumberValidation = require("./PasswordContainsNumberValidation");
const PasswordContainsSymbolValidation = require("./PasswordContainsSymbolValidation");

class PasswordValidation {
	/**
	 * @param password
	 * @throws [PasswordLengthValidationException | PasswordNonWhiteSpaceValidationException | PasswordContainsLowercaseValidationException | PasswordContainsUppercaseValidationException | PasswordContainsNumberValidationException | PasswordContainsSymbolValidationException]
	 */
	static validate(password) {
		PasswordLengthValidation.validate(password);
		PasswordNonWhiteSpaceValidation.validate(password);
		PasswordContainsLowercaseValidation.validate(password);
		PasswordContainsUppercaseValidation.validate(password);
		PasswordContainsNumberValidation.validate(password);
		PasswordContainsSymbolValidation.validate(password);
	}
}

module.exports = PasswordValidation;

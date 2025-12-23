const IService = require("../../../Core/IService"),
	PasswordValidation = require("../../validations/Password/PasswordValidation");

class SingUpService extends IService {
	constructor(_container) {
		super();

		Object.assign(this, { _container });
	}

	/**
	 * @throws [PasswordLengthValidationException | PasswordNonWhiteSpaceValidationException | PasswordContainsLowercaseValidationException | PasswordContainsUppercaseValidationException | PasswordContainsNumberValidationException | PasswordContainsSymbolValidationException]
	 * @returns {Promise<Object.<{id: string, role: string, username: string, password: string, updatedAt: Date, createdAt: Date, categoryId: string}>>}
	 */
	async execute(input) {
		const { username, password, role } = input;

		PasswordValidation.validate(password);

		return this._container.Repositories.userRepository.Create({
			values: {
				username,
				password,
				role,
			},
			options: {},
		});
	}
}

module.exports = SingUpService;

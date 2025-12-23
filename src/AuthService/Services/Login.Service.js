const IService = require("../../../Core/IService"),
	Token = require("./token/Token"),
	{
		ThisUserIsNotExistException,
		UsernameOrPasswordInIncorrectException,
	} = require("../../utils/exceptions"),
	tokenType = "Bearer";

class LoginService extends IService {
	constructor(_container) {
		super();

		Object.assign(this, {
			_container,
		});
	}

	async Execute(input) {
		const { username, password } = input;

		let token;

		const user = await this._container.Repositories.userRepository.FindOne({
			username,
		});

		if (user === null) {
			throw new ThisUserIsNotExistException();
		}

		if (
			await this._container.Repositories.userRepository.IsThisPasswordCorrect({
				candidatePassword: password,
				userPassword: user.password,
			})
		) {
			user.password = undefined;
			token = await new Token({
				id: user.id,
				role: user.role,
			}).sign();
		} else {
			throw new UsernameOrPasswordInIncorrectException();
		}

		return {
			user,
			token,
			tokenType,
		};
	}
}

module.exports = LoginService;

const IService = require("@Core/IService"),
	{ ThisUserIsNotExistException } = require("../../utils/exceptions");

class ProtectByTokenService extends IService {
	constructor(_container) {
		super();

		Object.assign(this, {
			_container,
		});
	}

	/**
	 *
	 * @param input.bearerToken
	 * @return {Promise<>}
	 * @constructor
	 */
	async Execute(input) {
		const { bearerToken } = input,
			token = this._container.Services.sanitizeBearerTokenService.Execute({
				bearerToken,
			}),
			decodedToken = await this._container.Services.decodeTokenService.Execute({
				token,
			}),
			freshUser = await this._container.Repositories.userRepository.GetUserByPk(
				{
					userId: decodedToken.id,
				},
			);

		if (!freshUser) {
			throw new ThisUserIsNotExistException();
		}

		return freshUser;
	}
}

module.exports = ProtectByTokenService;

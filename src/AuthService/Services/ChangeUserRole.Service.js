const IService = require("@Core/IService");

class ChangeUserRoleService extends IService {
	constructor(_container) {
		super();

		Object.assign(this, {
			_container,
		});
	}

	async Execute(input) {
		const { role, userId } = input;

		return this._container.Repositories.userRepository.Update({
			values: { role },
			where: {
				id: userId,
			},
		});
	}
}

module.exports = ChangeUserRoleService;

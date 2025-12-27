const IService = require("@Core/IService");

class AssignUserCategoryService extends IService {
	constructor(_container) {
		super();

		Object.assign(this, {
			_container,
		});
	}

	async Execute(input) {
		const { categoryId, userId } = input;
		return this._container.Repositories.userRepository.Update({
			values: { categoryId },
			where: { id: userId },
		});
	}
}

module.exports = AssignUserCategoryService;

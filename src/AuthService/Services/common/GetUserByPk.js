const { User, Category } = require("../../../models");

const as = "belongs_category";
const model = Category;

class GetUserByPk {
	#userId;

	constructor(userId) {
		this.#userId = userId;
	}

	async execute() {
		return User.findByPk(this.#userId, {
			include: [
				{
					model,
					as,
				},
			],
		});
	}
}

module.exports = GetUserByPk;

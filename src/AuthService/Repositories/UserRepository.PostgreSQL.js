const IUserRepository = require("../Core/IUserRepository"),
	bcrypt = require("bcryptjs"),
	as = "belongs_category";

class UserRepositoryPostgreSQL extends IUserRepository {
	/**
	 * @param DBModel {Sequelize.define<M>}
	 */
	constructor(DBModel) {
		super();

		Object.assign(this, {
			DBModel,
			model: undefined,
		});
	}

	async FindOne(input) {
		const { condition, include } = input;

		return this.DBModel.findOne({ where: condition, include });
	}

	async IsThisPasswordCorrect(input) {
		const { candidatePassword, userPassword } = input;

		return bcrypt.compare(candidatePassword, userPassword);
	}

	async Create(input) {
		const { values, options } = input;

		return this.DBModel.create(values, options);
	}

	async GetUserByPk(input) {
		const { userId } = input;

		if (this.model === undefined) {
			const { Category } = require("../../models");
			Object.assign(this, { Category });
		}

		return this.DBModel.findByPk(userId, {
			include: [
				{
					model: this.Category,
					as,
				},
			],
		});
	}
}

module.exports = UserRepositoryPostgreSQL;

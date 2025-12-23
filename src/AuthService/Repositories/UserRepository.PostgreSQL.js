const IUserRepository = require("../Core/IUserRepository"),
	bcrypt = require("bcryptjs");

class UserRepositoryPostgreSQL extends IUserRepository {
	/**
	 * @param DBModel {Sequelize.define<M>}
	 */
	constructor(DBModel) {
		super();

		Object.assign(this, {
			DBModel,
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
}

module.exports = UserRepositoryPostgreSQL;

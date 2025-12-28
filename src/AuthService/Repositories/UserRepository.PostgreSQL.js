const IUserRepository = require("../Core/IUserRepository"),
	bcrypt = require("bcryptjs"),
	as = "belongs_category";

class UserRepositoryPostgreSQL extends IUserRepository {
	/**
	 * @param _container.Models
	 */
	constructor(_container) {
		super();

		Object.assign(this, {
			_container,
		});
	}

	async FindOne(input) {
		const { where } = input;

		return this._container.Models.UserModel.findOne({
			where,
			include: [
				{
					model: this._container.Models.GetCategoryModel(),
					as,
				},
			],
		});
	}

	async IsThisPasswordCorrect(input) {
		const { candidatePassword, userPassword } = input;

		return bcrypt.compare(candidatePassword, userPassword);
	}

	async Create(input) {
		const { values, options } = input;

		return this._container.Models.UserModel.create(values, options);
	}

	async GetUserByPk(input) {
		const { userId } = input;

		return this._container.Models.UserModel.findByPk(userId, {
			include: [
				{
					model: this._container.Models.GetCategoryModel(),
					as,
				},
			],
		});
	}

	async Update(input) {
		const { values, where } = input;

		return this._container.Models.UserModel.update(values, {
			where,
			returning: true,
		});
	}

	async GetAllUsers(input) {
		const { where, options } = input;
		return this._container.Models.UserModel.findAll({
			where,
			include: [
				{
					model: this._container.Models.GetCategoryModel(),
					as,
				},
			],
			...options,
		});
	}
}

module.exports = UserRepositoryPostgreSQL;

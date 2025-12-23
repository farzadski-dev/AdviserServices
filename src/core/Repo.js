class Repo {
	DBModel;

	/**
	 * @param DBModel {Sequelize.define<M>}
	 */
	constructor(DBModel) {
		this.DBModel = DBModel;
	}

	/**
	 * @param values {Object<{}>}
	 * @param options {Object<{raw: boolean,
	 * isNewRecord: boolean, include: Array<>,
	 * fields: Array<{string}>,
	 * silent: boolean,
	 * validate: boolean,
	 * hooks: boolean,
	 * logging: Function,
	 * benchmark: boolean,
	 * transaction: Sequelize.transaction,
	 * searchPath: string,
	 * returning: boolean | Array<>
	 * }>}
	 * @returns {Promise<{module: Sequelize.define<M>}>}
	 */
	async create(values, options) {
		return this.DBModel.create(values, options);
	}

	async findOne(condition, include = []) {
		return this.DBModel.findOne({ where: condition, include });
	}
}

module.exports = Repo;

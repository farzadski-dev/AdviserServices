const as = 'belongs_user';
const foreignKey = 'userId';

class AnswerBelongsToUser {
	#AnswerModel;
	#UserModel;

	/**
	 * @param AnswerModel {Sequelize.define<M>}
	 * @param UserModel {Sequelize.define<M>}
	 */
	constructor(AnswerModel, UserModel) {
		this.#AnswerModel = AnswerModel;
		this.#UserModel = UserModel;
	}

	put() {
		this.#AnswerModel.user = this.#AnswerModel.belongsTo(this.#UserModel, {
			as,
			foreignKey,
		});
	}
}

module.exports = AnswerBelongsToUser;

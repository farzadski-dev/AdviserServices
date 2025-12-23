const as = 'belongs_user';
const foreignKey = 'userId';

class QuestionBelongsToUser {
	#QuestionModel;
	#UserModel;

	/**
	 * @param QuestionModel {Sequelize.define<M>}
	 * @param UserModel {Sequelize.define<M>}
	 */
	constructor(QuestionModel, UserModel) {
		this.#QuestionModel = QuestionModel;
		this.#UserModel = UserModel;
	}

	put() {
		this.#QuestionModel.user = this.#QuestionModel.belongsTo(
			this.#UserModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = QuestionBelongsToUser;

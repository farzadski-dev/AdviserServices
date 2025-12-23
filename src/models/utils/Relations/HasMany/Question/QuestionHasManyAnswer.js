const as = 'answers';
const foreignKey = 'questionId';

class QuestionHasManyAnswer {
	#QuestionModel;
	#AnswerModel;

	/**
	 * @param QuestionModel {Sequelize.define<M>}
	 * @param AnswerModel {Sequelize.define<M>}
	 */
	constructor(QuestionModel, AnswerModel) {
		this.#QuestionModel = QuestionModel;
		this.#AnswerModel = AnswerModel;
	}

	put() {
		this.#QuestionModel.answers = this.#QuestionModel.hasMany(
			this.#AnswerModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = QuestionHasManyAnswer;

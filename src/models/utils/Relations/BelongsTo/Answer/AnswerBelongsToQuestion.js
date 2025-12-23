const as = 'belongs_question';
const foreignKey = 'questionId';

class AnswerBelongsToQuestion {
	#AnswerModel;
	#QuestionModel;

	/**
	 * @param AnswerModel {Sequelize.define<M>}
	 * @param QuestionModel {Sequelize.define<M>}
	 */
	constructor(AnswerModel, QuestionModel) {
		this.#AnswerModel = AnswerModel;
		this.#QuestionModel = QuestionModel;
	}

	put() {
		this.#AnswerModel.question = this.#AnswerModel.belongsTo(
			this.#QuestionModel,
			{
				as,
				foreignKey,
			}
		);
	}
}

module.exports = AnswerBelongsToQuestion;

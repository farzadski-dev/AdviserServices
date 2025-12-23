const as = 'belongs_ticket_user';
const foreignKey = 'userId';

class TicketBelongsToUser {
	#TicketModel;
	#UserModel;

	/**
	 * @param TicketModel {Sequelize.define<M>}
	 * @param UserModel {Sequelize.define<M>}
	 */
	constructor(TicketModel, UserModel) {
		this.#TicketModel = TicketModel;
		this.#UserModel = UserModel;
	}

	put() {
		this.#TicketModel.user = this.#TicketModel.belongsTo(this.#UserModel, {
			as,
			foreignKey,
		});
	}
}

module.exports = TicketBelongsToUser;

const as = 'belongs_room';
const foreignKey = 'roomId';

class TicketBelongsToRoom {
	#RoomModel;
	#TicketModel;

	/**
	 * @param TicketModel {Sequelize.define<M>}
	 * @param RoomModel {Sequelize.define<M>}
	 */
	constructor(TicketModel, RoomModel) {
		this.#TicketModel = TicketModel;
		this.#RoomModel = RoomModel;
	}

	put() {
		this.#TicketModel.room = this.#TicketModel.belongsTo(this.#RoomModel, {
			as,
			foreignKey,
		});
	}
}

module.exports = TicketBelongsToRoom;

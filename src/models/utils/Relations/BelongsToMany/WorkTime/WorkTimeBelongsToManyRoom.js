const as = 'rooms';
const foreignKey = 'workTimeId';

class WorkTimeBelongsToManyRoom {
	#WorkTimeModel;
	#RoomModel;
	#through;
	/**
	 * @param WorkTimeModel {Sequelize.define<M>}
	 * @param RoomModel {Sequelize.define<M>}
	 * @param through {Sequelize.define<M>}
	 */
	constructor(WorkTimeModel, RoomModel, through) {
		this.#WorkTimeModel = WorkTimeModel;
		this.#RoomModel = RoomModel;
		this.#through = through;
	}

	put() {
		this.#WorkTimeModel.rooms = this.#WorkTimeModel.belongsToMany(
			this.#RoomModel,
			{
				as,
				through: this.#through,
				foreignKey,
			}
		);
	}
}

module.exports = WorkTimeBelongsToManyRoom;

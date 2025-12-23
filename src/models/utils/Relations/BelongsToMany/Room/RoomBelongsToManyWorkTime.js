const as = 'workTimes';
const foreignKey = 'roomId';

class RoomBelongsToManyWorkTime {
	#RoomModel;
	#WorkTimeModel;
	#through;

	/**
	 * @param RoomModel {Sequelize.define<M>}
	 * @param WorkTimeModel {Sequelize.define<M>}
	 * @param through {Sequelize.define<M>}
	 */
	constructor(RoomModel, WorkTimeModel, through) {
		this.#RoomModel = RoomModel;
		this.#WorkTimeModel = WorkTimeModel;
		this.#through = through;
	}

	put() {
		this.#RoomModel.workTimes = this.#RoomModel.belongsToMany(
			this.#WorkTimeModel,
			{
				as,
				through: this.#through,
				foreignKey,
			}
		);
	}
}

module.exports = RoomBelongsToManyWorkTime;

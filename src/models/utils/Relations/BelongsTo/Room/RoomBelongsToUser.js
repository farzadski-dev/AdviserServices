const as = 'belongs_user';
const foreignKey = 'userId';

class RoomBelongsToUser {
	#RoomModel;
	#UserModel;

	/**
	 * @param RoomModel {Sequelize.define<M>}
	 * @param UserModel {Sequelize.define<M>}
	 */
	constructor(RoomModel, UserModel) {
		this.#RoomModel = RoomModel;
		this.#UserModel = UserModel;
	}

	put() {
		this.#RoomModel.user = this.#RoomModel.belongsTo(this.#UserModel, {
			as,
			foreignKey,
		});
	}
}

module.exports = RoomBelongsToUser;

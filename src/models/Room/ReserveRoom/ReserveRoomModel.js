const { DataTypes, Sequelize } = require('sequelize');

const PostgresDB = require('../../../database/PostgresDB');
const { sequelize } = new PostgresDB();

const ReserveRoom = sequelize.define(
	'reserveRoom',
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: new Sequelize.UUIDV4(),
		},
		reserve_owner: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		seo: {
			type: DataTypes.JSON,
		},
		ticket_number: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
	},
	{
		paranoid: true,
		timestamps: true,
	}
);

module.exports = ReserveRoom;

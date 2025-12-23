const { DataTypes, Sequelize } = require('sequelize');

const PostgresDB = require('../../database/PostgresDB');
const { sequelize } = new PostgresDB();

const Room = sequelize.define(
	'room',
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: new Sequelize.UUIDV4(),
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		picture: {
			type: DataTypes.TEXT,
		},
		price: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		max_ticket: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		seo: {
			type: DataTypes.JSON,
		},
		commission: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		start_time: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		end_time: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		paranoid: true,
		timestamps: true,
	}
);

/**
 * @type {Sequelize.define<>}
 */
module.exports = Room;

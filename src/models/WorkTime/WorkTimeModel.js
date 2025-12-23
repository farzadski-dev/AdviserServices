const { DataTypes, Sequelize } = require('sequelize');

const PostgresDB = require('../../database/PostgresDB');
const { sequelize } = new PostgresDB();

const WorkTime = sequelize.define(
	'workTime',
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
			type: DataTypes.TEXT,
			allowNull: false,
		},
		picture: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		seo: {
			type: DataTypes.JSON,
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
module.exports = WorkTime;

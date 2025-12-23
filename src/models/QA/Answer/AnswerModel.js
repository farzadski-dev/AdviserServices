const { DataTypes, Sequelize } = require('sequelize');

const PostgresDB = require('../../../database/PostgresDB');
const { sequelize } = new PostgresDB();

const Answer = sequelize.define(
	'answer',
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
		answer: {
			type: DataTypes.TEXT,
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
module.exports = Answer;

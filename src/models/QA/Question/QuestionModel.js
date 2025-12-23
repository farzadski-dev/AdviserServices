const { DataTypes, Sequelize } = require('sequelize');

const PostgresDB = require('../../../database/PostgresDB');
const { sequelize } = new PostgresDB();

const Question = sequelize.define(
	'question',
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
		question: {
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
module.exports = Question;

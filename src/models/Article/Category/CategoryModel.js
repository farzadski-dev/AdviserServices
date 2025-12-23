const { DataTypes, Sequelize } = require('sequelize');

const PostgresDB = require('../../../database/PostgresDB');
const { sequelize } = new PostgresDB();

const Category = sequelize.define(
	'category',
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: new Sequelize.UUIDV4(),
		},
		category_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		parentId: {
			type: Sequelize.UUID,
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
module.exports = Category;

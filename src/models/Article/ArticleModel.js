const { DataTypes, Sequelize } = require('sequelize');

const PostgresDB = require('../../database/PostgresDB');
const { sequelize } = new PostgresDB();

const Article = sequelize.define(
	'article',
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: new Sequelize.UUIDV4(),
		},
		subject: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		article: {
			type: DataTypes.STRING,
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
 * @type {Sequelize.define<M>}
 */
module.exports = Article;

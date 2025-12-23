const { DataTypes, Sequelize } = require('sequelize');

const PostgresDB = require('../../../database/PostgresDB');
const { sequelize } = new PostgresDB();

const ReplyComment = sequelize.define(
	'reply_comment',
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: new Sequelize.UUIDV4(),
		},
		comment: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		seo: {
			type: DataTypes.JSON,
		},
		like_counts: {
			type: DataTypes.BIGINT,
			defaultValue: 0,
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
module.exports = ReplyComment;

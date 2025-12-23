const { DataTypes, Sequelize } = require('sequelize');

const PostgresDB = require('../../../database/PostgresDB');
const { sequelize } = new PostgresDB();

const Ticket = sequelize.define(
	'ticket',
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: new Sequelize.UUIDV4(),
		},
		ticket_number: {
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM('progress', 'done'),
			defaultValue: 'progress',
		},
		is_entered: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
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
module.exports = Ticket;

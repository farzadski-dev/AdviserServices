const { DataTypes, Sequelize } = require("sequelize"),
	bcrypt = require("bcryptjs"),
	PostgresDB = require("../../database/PostgresDB"),
	{ sequelize } = new PostgresDB();

const User = sequelize.define(
	"user",
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: new Sequelize.UUIDV4(),
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		role: {
			type: DataTypes.STRING,
			defaultValue: "client",
			validate: {
				isIn: [["admin", "adviser", "client"]],
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		indexes: [{ unique: true, fields: ["username"] }],
	},
);

User.beforeCreate(async (user, _options) => {
	user.password = await bcrypt.hash(user.password, 12);
});

/**
 * @type {Sequelize.define<>}
 */
module.exports = User;
